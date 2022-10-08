import React, { useState } from 'react'
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Alert,
  useColorScheme
} from 'react-native'

import allStyles from './styles'

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tristique fringilla ipsum scelerisque fringilla. Sed vel ullamcorper dui, at efficitur nisi. Morbi non condimentum erat. Nam convallis molestie odio, non pellentesque sem gravida at. Fusce venenatis ex quis magna gravida porttitor. Aliquam et neque ut neque vehicula porta. Donec varius commodo fermentum. Curabitur interdum vitae nulla dictum pulvinar. Nullam convallis, lectus in tincidunt gravida, urna elit congue nibh, porttitor suscipit augue nulla at neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed eget tristique mi, eu dictum justo. Sed porttitor felis ante, et gravida tortor facilisis eget. Morbi ultricies vehicula massa a interdum.'

function Reminder ({ data, onRequestDelete }) {
  const [seeDetails, setSeeDetails] = useState(false)
  const colorScheme = useColorScheme()

  const styles = allStyles[colorScheme]

  function confirmUser(title, message) {
    return new Promise((resolve, _reject) => {
      Alert.alert(title, message, [
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => resolve(false)
        },
        {
          text: 'Continuar',
          onPress: () => resolve(true)
        }
      ],
      {
        cancelable: true,
        onDismiss: () => resolve(false)
      })
    })
  }

  function handleOnPress() {
    setSeeDetails(val => !val)
  }

  async function handleOnPressDelete() {
    if (await confirmUser('ctz', 'as coisas n voltam tao facil....')) {
      onRequestDelete(data)
    }
  }

  if (!data.customStyles) {
    data.customStyles = {}
  }

  if (data.id.startsWith('temp_')) {
    data.customStyles.title = {
      ...data.customStyles.title,
      color: colorScheme == 'light' ? '#00000050' : '#FFFFFF50'
    }
  }

  return (
      <Pressable
        onPress={handleOnPress}
        style={[styles.container, data.customStyles?.container]}
      >
        <>
          <Text style={[styles.reminderTitle, data.customStyles.title]} >{data.title}</Text>
          { seeDetails ? 
            <>
              <Text style={[styles.reminderDetails, data.customStyles.details]} >{data.details ?? LOREM}</Text>
              <View style={styles.detailsBottom}>

                <TouchableOpacity
                  style={[styles.actionsButton, data.customStyles.actionButton]}
                >
                  <Text style={[styles.reminderDetails]}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionsButton, data.customStyles.actionButton]}
                  onPress={handleOnPressDelete}
                >
                  <Text style={styles.reminderDetails}>Apagar</Text>
                </TouchableOpacity>

              </View>
            </>
          : <></> }

        </>
      </Pressable>
  )
}


export { Reminder }
