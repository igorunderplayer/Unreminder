import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, useColorScheme } from 'react-native'

import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'


import { AntDesign } from '@expo/vector-icons'

import * as styles from './styles'

const SignIn = () => {
  const colorScheme = useColorScheme()
  const [loggingIn, setLoggingIn] = useState(false)

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

  return (
    <View style={styles[colorScheme].container}>

      <Text style={styles[colorScheme].text}>Faça login para entrar</Text>
      <TouchableOpacity onPress={onLoginButtonPress} style={styles[colorScheme].googleSignin} activeOpacity={0.9}>
        {loggingIn ? (
          <ActivityIndicator color={ colorScheme == 'light' ? '#000' : '#fff' } />
        ) : (
          <>
            <AntDesign
              name="google"
              color={colorScheme == 'light' ? '#000' : '#fff'}
              size={18}
              style={{ paddingHorizontal: 3 }}
            />
            <Text style={styles[colorScheme].signinText}>Entrar com google</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  )
}

export { SignIn }