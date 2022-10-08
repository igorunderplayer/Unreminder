import { StyleSheet } from 'react-native'

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
  },
  detailsBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  actionsButton: {
    height: 42,
    width: '45%',
    backgroundColor: '#222',
    borderRadius: 18,
    borderColor: '#777',
    borderWidth: 1,
    borderStyle: 'solid'
  }
})

export default styles
