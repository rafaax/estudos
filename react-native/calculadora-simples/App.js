import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { styles }  from './components/StyleSheet' 

export default function App() {

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState();

  function sum(){
    setResult(num1 + num2);
  }

  function sub(){
    setResult(num1 - num2);
  }

  function mult(){
    setResult(num1 * num2);
  }

  function div(){
    setResult(num1 / num2);
  }

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
        onChangeText={text => setNum1(parseFloat(text))} 
        
      />

      <TextInput 
        placeholder='Informe o segundo número'
        placeholderTextColor='rgba(1,1,255,0.5)'
        keyboardType='numeric'
        style={styles.input}
        onChangeText={text => setNum2(parseFloat(text))}
      
      />

      <Text style={styles.result}> Resultado: {result} </Text>

      <View style={styles.viewButtons}>

        <TouchableOpacity style={styles.buttons} >
          <Text style={styles.textButtons} onPress={sum} > + </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.textButtons} onPress={sub} > - </Text>
        </TouchableOpacity> 

        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.textButtons} onPress={mult} > * </Text>
        </TouchableOpacity> 

        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.textButtons} onPress={div} > / </Text>
        </TouchableOpacity> 
        
      </View>
    </View>
  );
}