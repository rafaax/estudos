import { StyleSheet } from 'react-native'
import Constants  from 'expo-constants'

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#000'
    },  
    textHeader: {
      fontSize: 30,
      textAlign: 'center', 
      padding: 15,
      backgroundColor: '#000',
      color: 'rgb(255, 200, 30)'
    },
    image: {
      flex: 1, 
    },
    textResult: {
      fontSize: 60, 
      fontWeight: 'bold', 
      color: 'rgb(255, 200, 30)',
      padding: 30,
      textAlign: 'center'
    }, 
    button: {
      backgroundColor: 'rgba(255, 200, 30, 0.5)',
      width: 300, 
      height: 100,
      borderRadius: 60, 
      alignItems: 'center',
      justifyContent: 'center'
    },
    textButton: {
      fontSize: 40, 
      fontWeight: 'bold'
    },
    conteudoInferior: {
      flex: 1, 
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: 60
    }
  
  })