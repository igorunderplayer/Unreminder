import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { useFonts, Roboto_300Light, Roboto_400Regular } from '@expo-google-fonts/roboto';

import { AntDesign } from '@expo/vector-icons'

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

import { Header } from './components/Header';
import { CreateNotification } from './components/CreateNotification';
import { Reminder } from './components/Reminder';

import { OneSignalAppId, OneSignalApiKey, webClientId } from './config.json';

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId
})

export default function App() {
  const [user, setUser] = useState()
  const [initializing, setInitializing] = useState(true)
  const [showCreateNotificationPopup, setShowCreateNotificationPopup] = useState(true)
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
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken)

     return auth().signInWithCredential(googleCredential)
    } catch (err) {
      alert('Login cancelado')
      alert('Erro: ' + err)
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
    const subscriber = userRef.collection('reminders').onSnapshot(onSnapshotResult)

    return subscriber
  }, [user])

  useEffect(() => { console.log(showCreateNotificationPopup) }, [showCreateNotificationPopup])

  const createReminder = async (reminder) => {
    console.log(reminder)
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
      title: reminder.title,
      details: reminder.details,
      id: reminder.id ?? null
    }).catch(err => console.error(err))
  }

  const onCreateReminder = async (reminder) => {
    console.log(reminder)
    const notificationObject = {
        app_id: OneSignalAppId,
        headings: { en: 'Lembrete!!' },
        contents: { en: reminder.title },
        include_external_user_ids: [user?.uid],
        channel_for_external_user_ids: "push",
        send_after: reminder.date.toUTCString(),
        headers: {
          Authorization: `Basic ${OneSignalApiKey}`
        }
    }

    const res = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      body: JSON.stringify(notificationObject),
      headers: {
        "Content-Type": 'application/json; charset=utf-8',
        Authorization: `Basic ${OneSignalApiKey}`
      }
    })

    const data = await res.json()
    const reminderObj = {
      id: data.id,
      ...reminder
    }

    createReminder(reminderObj)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)

    OneSignal.setLogLevel(6, 0)
    OneSignal.setAppId(OneSignalAppId)
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

    return subscriber
  }, [])

  if (initializing) {
    return <Text>Loading...</Text>
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <ExpoStatusBar style="auto" />
        <Text style={styles.text}>Vc precisa fazer login!!!</Text>
        <TouchableOpacity onPress={onLoginButtonPress} style={styles.googleSignin} activeOpacity={0.4}>
        <AntDesign
          name="google"
          color="#fff"
          size={18}
        />
          <Text style={styles.signinText}>Entrar com google</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ExpoStatusBar style="auto" />

      <Header profile={user} />


      <CreateNotification
        modalVisible={showCreateNotificationPopup}
        setModalVisible={setShowCreateNotificationPopup}
        onClose={() => setShowCreateNotificationPopup(false)}
        onCreate={onCreateReminder}
      />


      <ScrollView contentContainerStyle={styles.reminderList}>
        { reminders.map(r =>
          <Reminder key={r.id} data={r} />
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
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 12,
    borderColor: '#777',
    borderStyle: 'solid',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  signinText: {
    color: '#fff',
    padding: 6,
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
