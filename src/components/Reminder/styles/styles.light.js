import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEE',
    width: '95%',
    padding: 12,
    borderColor: '#999',
    borderStyle: 'solid',
    borderWidth: 0,
    borderRadius: 18,
    marginVertical: 4
  },
  reminderTitle: {
    fontFamily: 'Roboto_300Light',
    color: '#000',
    fontSize: 16
  },
  reminderDetails: {
    fontFamily: 'Roboto_300Light',
    color: '#222',
    padding: 8
  },
  detailsBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  detailsButton: {
    height: 42,
    width: '45%',
    backgroundColor: '#ddd',
    borderRadius: 18,
    borderColor: '#999',
    borderWidth: 0,
    borderStyle: 'solid'
  }
})

export default styles
