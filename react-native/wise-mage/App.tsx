import React, {useState, useEffect} from 'react'
import { TouchableOpacity, Text, View, ImageBackground, StyleSheet, StatusBar } from 'react-native';
import { Constants } from 'expo-constants';


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Faça sua pergunta!</Text>
      
      <ImageBackground style={styles.image}>
        <Text style={styles.textResult}></Text>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textButton}>Responder</Text>
        </TouchableOpacity>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  
})