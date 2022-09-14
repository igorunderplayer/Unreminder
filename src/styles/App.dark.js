import { StyleSheet, StatusBar } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight
  },
  reminderList: {
    alignItems: 'flex-start',
    backgroundColor: '#000',
    padding: 6
  },
  text: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'Roboto_300Light'
  },
  googleSignin: {
    alignSelf: 'center',
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 12,
    borderColor: '#777',
    borderStyle: 'solid',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    width: 168,
    height: 56,
  },
  signinText: {
    color: '#fff',
    paddingHorizontal: 3,
    fontFamily: 'Roboto_300Light'
  },
  bottomContainer: {
    width: '100%',
    height: 72,
    backgroundColor: '#000',
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
