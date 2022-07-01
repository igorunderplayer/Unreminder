import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar, ToastAndroid, Platform, ActivityIndicator, Appearance } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { useFonts, Roboto_300Light, Roboto_400Regular } from '@expo-google-fonts/roboto';

import { AntDesign } from '@expo/vector-icons'

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { Header } from './components/Header';
import { CreateNotification } from './components/CreateNotification';
import { Reminder } from './components/Reminder';

import appStyles from './styles/App.styles'

import { ONE_SIGNAL_APP_ID, NOTIFICATION_API_URL, WEBCLIENT_ID } from '@env'

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: WEBCLIENT_ID
})

export default function App() {
  const [user, setUser] = useState()
  const [initializing, setInitializing] = useState(true)
  const [loggingIn, setLoggingIn] = useState(false)
  const [showCreateNotificationPopup, setShowCreateNotificationPopup] = useState(false)
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme())
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular
  })

  const [reminders, setReminders] = useState([])

  const onAuthStateChanged = (user) => {
    setUser(user)
    if (user) OneSignal.setExternalUserId(user?.uid)
    if (initializing) setInitializing(false)
  }

  const onLoginButtonPress = async () => {
    if (loggingIn) return

    setLoggingIn(true)
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken)

     return await auth().signInWithCredential(googleCredential)
    } catch (err) {
      alert('Login cancelado')
      alert('Erro: ' + err)
    } finally {
      setLoggingIn(false)
    }
  }

  const onSnapshotResult = (snapshot)  => {
    if (!snapshot) return
    const remindersData = snapshot.docs.map(doc => doc.data())
    setReminders(remindersData)
  }

  useEffect(() => {
    if (!user) return
    const userRef = firestore().collection('users').doc(user.uid)
    const subscriber = userRef.collection('reminders').orderBy('createdAt', 'desc').onSnapshot(onSnapshotResult)

    return subscriber
  }, [user])

  const deleteReminder = async (reminder) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show('Deletando lembrete...', ToastAndroid.SHORT)
    }

    const userRef = firestore().collection('users').doc(user.uid)
    await userRef.collection('reminders').doc(reminder.id).delete()

    await fetch(`${NOTIFICATION_API_URL}/notifications/${reminder.id}`, {
      method: 'DELETE'
    })

    if (Platform.OS === 'android') {
      ToastAndroid.show('Lembrete deletado', ToastAndroid.SHORT)
    }
  }

  const createReminder = async (reminder) => {
    const userRef = firestore().collection('users').doc(user.uid)
    const userDb = await userRef.get()
    if (!userDb.exists) {
      await userRef.set({
        displayName: user.displayName,
        email: user.email, // rsrs
        id: user.uid,
        photoURL: user.photoURL
      })
    }

    userRef.collection('reminders').doc(reminder.id).set({
      ...reminder,
      id: reminder.id ?? Date.now().toString()
    }).catch(err => console.error(err))
  }

  const onCreateReminder = async (reminder) => {
    setReminders(val => {
      return [{ ...reminder, id: `temp_${Date.now()}` }, ...val]
    })

    const notificationObject = {
	userId: user?.uid,
	header: 'Lembrete!',
	contents: { en: reminder.title },
        sendAfter: reminder.date.toUTCString()
    }
    
    const res = await fetch(`${NOTIFICATION_API_URL}/schedule`, {
      method: 'POST',
      body: JSON.stringify(notificationObject),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await res.json()

    const reminderObj = {
      id: data.id,
      createdAt: firestore.FieldValue.serverTimestamp(), 
      ...reminder
    }

    createReminder(reminderObj)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)

    OneSignal.setLogLevel(6, 0)
    OneSignal.setAppId(ONE_SIGNAL_APP_ID)
    OneSignal.setExternalUserId(user?.uid)

    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
      // console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
      let notification = notificationReceivedEvent.getNotification();
      // console.log("notification: ", notification);
      const data = notification.additionalData
      // console.log("additionalData: ", data);
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    });

     //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log("OneSignal: notification opened:", notification);
    });

    const listener = Appearance.addChangeListener((appearence) => {
      setColorScheme(appearence.colorScheme)
    })

    return () => {
      subscriber()
      listener.remove()
    }
  }, [])

  const styles = appStyles[colorScheme]

  if (!fontsLoaded || initializing) {
    return (
      <View style={styles.container}>
        <ExpoStatusBar backgroundColor={ colorScheme == 'white' ? '#fff' : '#000' } />
        <Text style={{ ...styles.text, textAlign: 'center' }}>Carregando...</Text>
      </View>
    )
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <ExpoStatusBar backgroundColor={ colorScheme == 'light' ? '#fff' : '#000' } />
        <Text style={{ alignSelf: 'center', ...styles.text }}>Faça login para entrar</Text>
        <TouchableOpacity onPress={onLoginButtonPress} style={styles.googleSignin} activeOpacity={0.9}>
          { loggingIn ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <AntDesign
                name="google"
                color={ colorScheme == 'light' ? '#000' : '#fff' }
                size={18}
                style={{ paddingHorizontal: 3 }}
              />
              <Text style={styles.signinText}>Entrar com google</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ExpoStatusBar backgroundColor={ colorScheme == 'light' ? '#fff' : '#000' } />
      <Header profile={user} />

      <CreateNotification
        modalVisible={showCreateNotificationPopup}
        setModalVisible={setShowCreateNotificationPopup}
        onClose={() => setShowCreateNotificationPopup(false)}
        onCreate={onCreateReminder}
      />

      <ScrollView contentContainerStyle={styles.reminderList}>
        { reminders.map(r =>
          <Reminder key={r.id} data={r} onRequestDelete={deleteReminder} />
        )}
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.addReminderContainer} onPress={() => setShowCreateNotificationPopup(true)}>
          <Text style={styles.addReminderText}>+</Text> 
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight
  },
  reminderList: {
    alignItems: 'flex-start',
    backgroundColor: '#000',
    padding: 6
  },
  text: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'Roboto_300Light'
  },
  googleSignin: {
    alignSelf: 'center',
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 12,
    borderColor: '#777',
    borderStyle: 'solid',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    width: 168,
    height: 56,
  },
  signinText: {
    color: '#fff',
    paddingHorizontal: 3,
    fontFamily: 'Roboto_300Light'
  },
  bottomContainer: {
    width: '100%',
    height: 72,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addReminderContainer: {
    backgroundColor: '#6546e7',
    justifyContent: 'center',
    alignItems: 'center',
    width: 58,
    height: 58,
    borderRadius: 24,
  },
  addReminderText: {
    fontSize: 38,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Roboto_300Light'
  }
});
