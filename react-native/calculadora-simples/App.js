import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { styles }  from './components/StyleSheet' 

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}> Calculadora</Text> 
      </View>
      

      <TextInput 
        placeholder='Informe o primeiro número' 
        placeholderTextColor='rgba(150,1,1,0.5)'
        keyboardType='numeric'
        style={styles.input} 
        
      />
      <TextInput 
        placeholder='Informe o segundo número'
        placeholderTextColor='rgba(1,1,255,0.5)'
        keyboardType='numeric'
        style={styles.input} 
      
      />

      <Text style={styles.result}> Resultado</Text>

      <View style={styles.viewButtons}>

        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.textButtons}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.textButtons}>-</Text>
        </TouchableOpacity> 

        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.textButtons}>*</Text>
        </TouchableOpacity> 

        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.textButtons}>/</Text>
        </TouchableOpacity> 
        
      </View>
    </View>
  );
}