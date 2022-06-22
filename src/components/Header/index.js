import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

import auth from '@react-native-firebase/auth'

import { AntDesign } from '@expo/vector-icons'

function Header ({ profile }) {
  
  const signOut = () => {
    auth().signOut()
  }

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={signOut} style={styles.logout}>
        <AntDesign
          name="logout"
          color="#fff"
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#000',
    borderColor: '#777',
    borderBottomWidth: 1,
    borderStyle: 'solid'
  },
  text: {
    fontFamily: 'Roboto_300Light',
    color: '#fff',
    fontSize: 16,
    padding: 8
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center'
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
