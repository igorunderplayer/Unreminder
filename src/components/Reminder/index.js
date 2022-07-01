import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Alert,
  Appearance
} from 'react-native'

import allStyles from './styles'

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tristique fringilla ipsum scelerisque fringilla. Sed vel ullamcorper dui, at efficitur nisi. Morbi non condimentum erat. Nam convallis molestie odio, non pellentesque sem gravida at. Fusce venenatis ex quis magna gravida porttitor. Aliquam et neque ut neque vehicula porta. Donec varius commodo fermentum. Curabitur interdum vitae nulla dictum pulvinar. Nullam convallis, lectus in tincidunt gravida, urna elit congue nibh, porttitor suscipit augue nulla at neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed eget tristique mi, eu dictum justo. Sed porttitor felis ante, et gravida tortor facilisis eget. Morbi ultricies vehicula massa a interdum.'

function Reminder ({ data, onRequestDelete }) {
  const [seeDetails, setSeeDetails] = useState(false)
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme())

  useEffect(() => {
    const listener = Appearance.addChangeListener((appearence) => {
      setColorScheme(appearence.colorScheme)
    })
    
    return () => listener.remove()
  }, [])

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

  return (
      <Pressable
        onPress={handleOnPress}
        style={styles.container}
      >
        <>
          <Text style={data.id.startsWith('temp_') ? { ...styles.reminderTitle, color: '#555' } : styles.reminderTitle} >{data.title}</Text>
          { seeDetails ? 
            <>
              <Text style={styles.reminderDetails} >{data.details ?? LOREM}</Text>
              <View style={styles.detailsBottom}>

                <TouchableOpacity
                  style={styles.detailsButton}
                >
                  <Text style={styles.reminderDetails}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.detailsButton}
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
