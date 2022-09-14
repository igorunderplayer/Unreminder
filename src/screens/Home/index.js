import React, { useState, useEffect } from 'react'

import { View, Text, ScrollView, TouchableOpacity, useColorScheme } from 'react-native'

import firestore from '@react-native-firebase/firestore'

import { Header } from '../../components/Header'
import { CreateNotification } from '../../components/CreateNotification'
import { Reminder } from '../../components/Reminder'

import * as styles from './styles'

import { NOTIFICATION_API_URL } from '@env'

const Home = ({ user }) => {
  const [showCreateNotificationPopup, setShowCreateNotificationPopup] = useState(false)
  const [reminders, setReminders] = useState([])
  const colorScheme = useColorScheme()

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

  return (
    <View style={styles[colorScheme].container}>
      <Header profile={user} />

      <CreateNotification
        modalVisible={showCreateNotificationPopup}
        setModalVisible={setShowCreateNotificationPopup}
        onClose={() => setShowCreateNotificationPopup(false)}
        onCreate={onCreateReminder}
      />

      <ScrollView contentContainerStyle={styles[colorScheme].reminderList}>
        {reminders.map(r =>
          <Reminder key={r.id} data={r} onRequestDelete={deleteReminder} />
        )}
      </ScrollView>

      <View style={styles[colorScheme].bottomContainer}>
        <TouchableOpacity style={styles[colorScheme].addReminderContainer} onPress={() => setShowCreateNotificationPopup(true)}>
          <Text style={styles[colorScheme].addReminderText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export { Home }


