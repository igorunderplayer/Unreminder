import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '98%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderTopColor: '#777',
    borderLeftColor: '#777',
    borderRightColor: '#777',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    position: 'absolute',
    zIndex: 69
  },
  title: {
    fontFamily: 'Roboto_100Thin',
    textAlign: 'center',
    color: '#fff',
    fontSize: 34
  },
  textInput: {
    width: '90%',
    maxHeight: 256,
    minHeight: 44,
    backgroundColor: '#111',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderColor: '#777',
    borderWidth: 1,
    borderStyle: 'solid',
    margin: 4,
    color: '#fff',
    fontFamily: 'Roboto_300Thin'
  },
  createNotificationButton: {
    width: '90%',
    height: 48,
    backgroundColor: '#6546e7',
    justifyContent: 'center',
    borderRadius: 18,
  },
  createNotificationButtonText: {
    color: '#fff',
    padding: 12,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Roboto_400Regular'
  }
})

export default styles
