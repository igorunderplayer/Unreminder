import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#fff',
    borderColor: '#999',
    borderBottomWidth: 1,
    borderStyle: 'solid'
  },
  text: {
    fontFamily: 'Roboto_300Light',
    color: '#000',
    fontSize: 16,
    padding: 8
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  info: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderColor: '#4dff8b',
    borderWidth: 1
  }
})

export default styles
