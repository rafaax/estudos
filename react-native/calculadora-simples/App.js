import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { styles }  from './components/StyleSheet' 

export default function App() {

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState(0);

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

  function clear(){
    setResult(0);
    setNum2(0);
    setNum1(0);
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
        value={num1 !== 0 ? num1.toString() : ''}
        onChangeText={text => setNum1(parseFloat(text))} 
        
      />

      <TextInput 
        placeholder='Informe o segundo número'
        placeholderTextColor='rgba(1,1,255,0.5)'
        keyboardType='numeric'
        style={styles.input}
        value={num2 !== 0 ? num2.toString() : ''}
        onChangeText={text => setNum2(parseFloat(text))}
      
      />

      <Text style={styles.result}> Resultado: {result.toFixed(2)} </Text>

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

      <View style={{alignItems: 'center'}}>
        <TouchableOpacity 
          style={{
            ...styles.buttons,
            width: 350
          }}>
          
          <Text style={styles.textButtons} onPress={clear}> Limpar </Text>

        </TouchableOpacity>
      </View>

    </View>
  );
}