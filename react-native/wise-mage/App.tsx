import React, {useState, useEffect} from 'react'
import { TouchableOpacity, Text, View, ImageBackground, StyleSheet, StatusBar } from 'react-native';
import Constants from 'expo-constants';


export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content'></StatusBar>
      <Text style={styles.textHeader}>Faça sua pergunta!</Text>
      
      <ImageBackground 
          source={require('./assets/wizarddd.png')} 
          style={styles.image}
        >
        <View style={styles.conteudoInferior}>
          <Text style={styles.textResult}></Text>
          
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>Responder</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 100, 
    fontWeight: 'bold', 
    color: 'rgb(255, 200, 30)',
    padding: 30
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