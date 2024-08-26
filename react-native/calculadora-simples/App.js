import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { styles }  from './components/StyleSheet' 

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text> Calculadora</Text> 
      </View>
      

      <TextInput placeholder='Informe o primeiro número' style={styles.input} />
      <TextInput placeholder='Informe o segundo número' style={styles.input} />

      <Text style={styles.result}> Resultado</Text>

      <View style={styles.viewButtons}>

        <TouchableOpacity style={styles.buttons}>
          <Text>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttons}>
          <Text>-</Text>
        </TouchableOpacity> 

        <TouchableOpacity style={styles.buttons}>
          <Text>*</Text>
        </TouchableOpacity> 

        <TouchableOpacity style={styles.buttons}>
          <Text>/</Text>
        </TouchableOpacity> 
        
      </View>
    </View>
  );
}