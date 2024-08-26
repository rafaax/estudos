import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { styles }  from './components/StyleSheet' 

export default function App() {
  return (
    <View style={styles.container}>
      <Text> Calculadora</Text>

      <TextInput placeholder='Informe o primeiro número' />
      <TextInput placeholder='Informe o segundo número' />

      <Text>Resultado</Text>

      <View>

        <TouchableOpacity>
          <Text>+</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text>-</Text>
        </TouchableOpacity> 

        <TouchableOpacity>
          <Text>*</Text>
        </TouchableOpacity> 
        
        <TouchableOpacity>
          <Text>/</Text>
        </TouchableOpacity> 
        
      </View>
    </View>
  );
}