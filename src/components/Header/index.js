import React from 'react'
import { View, Text, Image, TouchableOpacity, useColorScheme } from 'react-native'

import auth from '@react-native-firebase/auth'

import { AntDesign } from '@expo/vector-icons'

import allStyles from './styles'

function Header ({ profile }) {
  const colorScheme = useColorScheme()
  
  const signOut = () => {
    auth()
      .signOut()
  }

  const styles = allStyles[colorScheme]

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={signOut} style={styles.logout}>
        <AntDesign
          name="logout"
          color={ colorScheme == 'light' ? '#000' : '#fff' }
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
