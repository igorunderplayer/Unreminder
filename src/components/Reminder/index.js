import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function Reminder ({ data }) { 
  return (
    <View style={styles.container}>
      <Text>{data.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4254f5',
    width: 186,
    height: 186,
    borderRadius: 18,
    margin: 6
  }
})

export { Reminder }
