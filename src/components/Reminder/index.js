import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tristique fringilla ipsum scelerisque fringilla. Sed vel ullamcorper dui, at efficitur nisi. Morbi non condimentum erat. Nam convallis molestie odio, non pellentesque sem gravida at. Fusce venenatis ex quis magna gravida porttitor. Aliquam et neque ut neque vehicula porta. Donec varius commodo fermentum. Curabitur interdum vitae nulla dictum pulvinar. Nullam convallis, lectus in tincidunt gravida, urna elit congue nibh, porttitor suscipit augue nulla at neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed eget tristique mi, eu dictum justo. Sed porttitor felis ante, et gravida tortor facilisis eget. Morbi ultricies vehicula massa a interdum.'

function Reminder ({ data }) {
  const [seeDetails, setSeeDetails] = useState(false)

  function handleOnPress() {
    setSeeDetails(val => !val)
  }
  return (
      <Pressable onPress={handleOnPress} style={styles.container}>
        <>
          <Text style={styles.reminderTitle} >{data.title}</Text>
          
          { seeDetails ? <Text style={styles.reminderDetails} >{data.details ?? LOREM}</Text> : <></> }

        </>
      </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    width: '95%',
    padding: 12,
    borderColor: '#777',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 18,
    marginVertical: 4
  },
  reminderTitle: {
    fontFamily: 'Roboto_300Light',
    color: '#fff',
    fontSize: 16
  },
  reminderDetails: {
    fontFamily: 'Roboto_300Light',
    color: '#dedede',
    padding: 8
  }
})

export { Reminder }
