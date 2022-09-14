import { StyleSheet, StatusBar } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
    fontFamily: 'Roboto_100Thin',
    fontSize: 32,
    textAlign: 'center',
    padding: 16
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
  }
})

export default styles