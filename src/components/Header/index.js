import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, Appearance } from 'react-native'

import auth from '@react-native-firebase/auth'

import { AntDesign } from '@expo/vector-icons'

import allStyles from './styles'

function Header ({ profile }) {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme())
  
  const signOut = () => {
    auth().signOut()
  }

  useEffect(() => {
    const listener = Appearance.addChangeListener((appearence) => {
      setColorScheme(appearence.colorScheme)
    })

    return () => listener.remove()
  }, [])

  const styles = allStyles[colorScheme]

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={signOut} style={styles.logout}>
        <AntDesign
          name="logout"
          color={ colorScheme == 'white' ? '#fff' : '#000' }
          size={18}
        />

        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={styles.text}>{profile.displayName}</Text>
        <Image source={{ uri: profile.photoURL }} style={styles.avatar} />
      </View>

    </View>
  )
}


export { Header }
