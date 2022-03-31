import React, {} from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

import auth from '@react-native-firebase/auth'

function Header ({ profile }) {
  
  const signOut = () => {
    auth().signOut()
  }

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={signOut}>
        <Text style={styles.text}>SignOut</Text>
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={styles.text}>{profile.displayName}</Text>
        <Image source={{ uri: profile.photoURL }} style={styles.avatar} />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    height: 56,
    width: '100%',
    top: 28,
    padding: 8,
    zIndex: 10,
    backgroundColor: '#000',
  },
  text: {
    fontFamily: 'Roboto_300Light',
    color: '#fff',
    fontSize: 16,
    padding: 8
  },
  info: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderColor: '#4dff8b',
    borderWidth: 1
  }
})

export { Header }
