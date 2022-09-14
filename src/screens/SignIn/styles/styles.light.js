import { StyleSheet, StatusBar } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  text: {
    color: '#000',
    fontFamily: 'Roboto_100Thin',
    fontSize: 32
  },
  googleSignin: {
    alignSelf: 'center',
    backgroundColor: '#fff',
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
    color: '#000',
    paddingHorizontal: 3,
    fontFamily: 'Roboto_300Light'
  }
})

export default styles