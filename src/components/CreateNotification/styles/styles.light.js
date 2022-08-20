import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '98%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderTopColor: '#999',
    borderLeftColor: '#999',
    borderRightColor: '#999',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    position: 'absolute',
    zIndex: 69
  },
  title: {
    fontFamily: 'Roboto_100Thin',
    textAlign: 'center',
    color: '#000',
    fontSize: 34
  },
  textInput: {
    width: '90%',
    maxHeight: 256,
    minHeight: 44,
    backgroundColor: '#eee',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderColor: '#999',
    borderWidth: 0,
    borderStyle: 'solid',
    margin: 4,
    color: '#000',
    fontFamily: 'Roboto_300Thin'
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
    textAlign: 'center',
    fontFamily: 'Roboto_400Regular'
  }
})

export default styles
