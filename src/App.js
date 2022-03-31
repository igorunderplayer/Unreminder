import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { useFonts, Roboto_300Light, Roboto_400Regular } from '@expo-google-fonts/roboto';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

import { GoogleSignin } from '@react-native-google-signin/google-signin';

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
    if(user) OneSignal.setExternalUserId(user?.uid)
    if(initializing) setInitializing(false)
  }

  const onLoginButtonPress = async () => {
    try {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    return auth().signInWithCredential(googleCredential)
    } catch(err) {
      alert('Login cancelado')
      console.log(err)
    }
  }

  const onSnapshotResult = (snapshot)  => {
    if (!snapshot) return
    const remindersData = snapshot.docs.map(doc => doc.data())
    setReminders(remindersData)
  }

  useEffect(() => {
    if(!user) return
    const userRef = firestore().collection('users').doc(user.uid)
    const subscriber = userRef.collection('reminders').onSnapshot(onSnapshotResult)

    return subscriber
  }, [user])

  const createReminder = async (reminder) => {
    console.log(reminder)
    const userRef = firestore().collection('users').doc(user.uid)
    const userDb = await userRef.get()
    if(!userDb.exists) {
      await userRef.set({
        displayName: user.displayName,
        id: user.uid,
        photoURL: user.photoURL
      })
    }

    userRef.collection('reminders').doc(reminder.id).set({
      title: reminder.title,
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
      title: reminder.title,
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

  if(initializing) {
    return <Text>Loading...</Text>
  }

  if(!user) {
    return (
      <>
        <Text>Vc precisa fazer login!!!</Text>
        <TouchableOpacity onPress={onLoginButtonPress}>
          <Text>Login with google</Text>
        </TouchableOpacity>
      </>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Header profile={user} />

      <Text style={styles.text}>Welcome!</Text>

      <ScrollView contentContainerStyle={styles.reminderList}>
        { reminders.map(r =>
          <Reminder key={r.id} data={r} />
        )}
      </ScrollView>

      <View style={styles.addReminderContainer}>
         <TouchableOpacity style={styles.addReminder} onPress={() => setShowCreateNotificationPopup(true)}>
            <Text style={styles.text}>Adicionar</Text> 
        </TouchableOpacity>
      </View> 
      
      { showCreateNotificationPopup ?
        <CreateNotification
          onClose={() => setShowCreateNotificationPopup(false)}
          onCreate={onCreateReminder}
        />
        : <></>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Roboto_400Regular'
  },
  addReminderContainer: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 68,
  },
  addReminder: {
    backgroundColor: '#4254f5',
    height: '80%',
    width: '75%',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
