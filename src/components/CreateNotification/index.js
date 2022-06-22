import React, { useState } from 'react'
import {
  View,
  ScrollView,
  Text, StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal
} from 'react-native'

import DatePicker from 'react-native-date-picker'
import { AntDesign } from '@expo/vector-icons'

function CreateNotification ({ modalVisible, setModalVisible, onCreate }) {
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [date, setDate] = useState(new Date())

  const handlePress = () => {
    if (title.length < 1 || details.length < 1) return
    if (title.length > 38) return Alert.alert('nha~', '😳 Seu titulo é muito grande oni-chan, tente um menor..... (q tenha no max 38 caracteres)')

    onCreate({
      title,
      date,
      details
    })

    setTitle('')
    setDetails('')
    setDate(new Date())
    setModalVisible(!modalVisible)
  }

  return (
    <Modal
      transparent
      visible={modalVisible}
      animationType="slide"
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={{
                position: 'absolute',
                top: 8,
                left: 8,
                backgroundColor: '#e74646',
                borderRadius: 14,
                alignItems: 'center',
                justifyContent: 'center',
                width: 26,
                height: 28
            }}>

            <AntDesign
              name="close"
              color="#fff"
              size={22}
            />

          </TouchableOpacity>

          <Text style={styles.title}>Criar um novo lembrete!</Text>

          <View style={{ width: '100%', alignItems: 'center' }}>
            <TextInput
              style={styles.textInput}
              placeholder="Titulo do seu lembrete..."
              placeholderTextColor="#555"
              maxLength={38}
              onChangeText={(text) => setTitle(text)}
              value={title}
            />

            <TextInput
              style={styles.textInput}
              placeholder="Detalhes do seu lembrete..."
              placeholderTextColor="#555"
              multiline={true}
              onChangeText={(text) => setDetails(text)}
              value={details}
            />

          </View>

          <DatePicker
            date={date}
            onDateChange={setDate}
            minimumDate={new Date()}
            textColor="#fff"
            fadeToColor="none"
          />

          <Text style={{
            fontStyle: 'italic',
            color: '#777',
            fontFamily: 'Roboto_300Light',
            fontSize: 12
          }}> obs: se a data for mt longe, vc provavelmente n sera notificado </Text>      

          <TouchableOpacity
            style={styles.createNotificationButton}
            onPress={handlePress}
            activeOpacity={0.4}
          >
          <Text style={styles.createNotificationButtonText}>Adicionar</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '98%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderTopColor: '#777',
    borderLeftColor: '#777',
    borderRightColor: '#777',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
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
    maxHeight: 256,
    minHeight: 44,
    backgroundColor: '#111',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderColor: '#777',
    borderWidth: 1,
    borderStyle: 'solid',
    margin: 4,
    color: '#fff'
  },
  createNotificationButton: {
    width: '90%',
    height: 48,
    backgroundColor: '#6546e7',
    padding: 12,
    justifyContent: 'center',
    borderRadius: 18,
  },
  createNotificationButtonText: {
    color: '#fff',
    textAlign: 'center'
  }
})

export { CreateNotification }
