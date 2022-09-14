import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  reminderList: {
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 6
  },
  text: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'Roboto_300Light'
  },
  bottomContainer: {
    width: '100%',
    height: 72,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addReminderContainer: {
    backgroundColor: '#6546e7',
    justifyContent: 'center',
    alignItems: 'center',
    width: 58,
    height: 58,
    borderRadius: 24,
  },
  addReminderText: {
    fontSize: 38,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Roboto_300Light'
  }
})

export default styles