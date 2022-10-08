import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  Appearance,
  useColorScheme
} from 'react-native'

import DatePicker from 'react-native-date-picker'
import { AntDesign } from '@expo/vector-icons'

import allStyles from './styles'

function CreateNotification ({ modalVisible, setModalVisible, onCreate }) {
  const [title, setTitle]     = useState('')
  const [details, setDetails] = useState('')
  const [date, setDate]       = useState(new Date())
  const colorScheme           = useColorScheme()

  const styles = allStyles[colorScheme]

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

          <Text style={styles.title}>Criar um novo lembrete</Text>

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
            textColor={ colorScheme == 'light' ? '#000' : '#fff' }
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


export { CreateNotification }
