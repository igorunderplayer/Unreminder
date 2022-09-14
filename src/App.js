import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Text, View, useColorScheme } from 'react-native'
import OneSignal from 'react-native-onesignal'

import {
  useFonts,
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular
} from '@expo-google-fonts/roboto'

import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'

import { SignIn } from './screens/SignIn'
import { Home } from './screens/Home'

import appStyles from './styles/App.styles'

import { ONE_SIGNAL_APP_ID, WEBCLIENT_ID } from '@env'

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: WEBCLIENT_ID
})

export default function App() {
  const colorScheme = useColorScheme()
  const [user, setUser] = useState()
  const [initializing, setInitializing] = useState(true)
  const [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_300Light,
    Roboto_400Regular
  })


  const onAuthStateChanged = (user) => {
    setUser(user)
    if (user) OneSignal.setExternalUserId(user?.uid)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)

    OneSignal.setLogLevel(6, 0)
    OneSignal.setAppId(ONE_SIGNAL_APP_ID)
    OneSignal.setExternalUserId(user?.uid)

    OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
      let notification = notificationReceivedEvent.getNotification();
      const data = notification.additionalData
      notificationReceivedEvent.complete(notification);
    })

    return () => {
      subscriber()
    }
  }, [])

  const styles = appStyles[colorScheme]

  if (!fontsLoaded || initializing) {
    return (
      <View style={styles.container}>
        <ExpoStatusBar backgroundColor={colorScheme == 'white' ? '#fff' : '#000'} />
        <Text style={{ ...styles.text, textAlign: 'center' }}>Carregando...</Text>
      </View>
    )
  }

  return (
    !user ? <SignIn /> : <Home user={user} />
  )
}


