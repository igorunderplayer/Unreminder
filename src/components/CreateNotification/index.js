import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'

import DatePicker from 'react-native-date-picker'


function CreateNotification ({ onClose, onCreate }) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(new Date())

  const handlePress = () => {
    if(title.length < 1) return
    onCreate({
      title,
      date
    })
    setTitle('')
    setDate(new Date())
    onClose()
  }

  const today = new Date()
  today.setMonth(today.getMonth() + 1)
  today.setHours(today.getHours() - 1)
  const oneMonthLater = new Date(today)

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onClose}
        style={{
            position: 'absolute',
            top: 3,
            left: 6
        }}>

        <Text style={{ color: '#666', fontSize: 22}}>✖ (temp)</Text>

      </TouchableOpacity>

      <Text style={styles.title}>Criar um novo lembrete!</Text>

      <TextInput
        style={styles.textInput}
        placeholder="Placeholder top"
        placeholderTextColor="#555"
        onChangeText={(text) => setTitle(text)}
        value={title}
      />

      <DatePicker
        date={date}
        onDateChange={setDate}
        minimumDate={new Date()}
        textColor="#fff"
        fadeToColor="none"
      />

      <Text style={{
        fontStyle: 'italic',
        color: '#adadad',
        fontFamily: 'Roboto_300Light',
        fontSize: 12
      }}> obs: se a data for mt longe, vc provavelmente n sera notificado </Text>

      <TouchableOpacity
        style={styles.createNotificationButton}
        onPress={handlePress}
      >
        <Text style={styles.createNotificationButtonText}>Criar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    top: 18,
    width: '95%',
    height: '96%',
    borderRadius: 12,
    backgroundColor: '#1b1a18',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    position: 'absolute',
    zIndex: 69
  },
  title: {
    fontFamily: 'Roboto_300Light',
    textAlign: 'center',
    color: '#fff',
    fontSize: 34
  },
  textInput: {
    width: '90%',
    height: 44,
    backgroundColor: '#333',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    color: '#fff'
  },
  createNotificationButton: {
    width: '90%',
    height: 48,
    backgroundColor: '#6546e7',
    padding: 12,
    borderRadius: 18
  },
  createNotificationButtonText: {
    color: '#fff',
    textAlign: 'center'
  }
})

export { CreateNotification }
