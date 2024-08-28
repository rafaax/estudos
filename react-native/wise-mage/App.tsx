import React, {useState, useEffect} from 'react';
import { TouchableOpacity, Text, View, ImageBackground, StatusBar } from 'react-native';
import { styles } from './components/StyleSheet' ;
import { Header } from './components/Header';


export default function App() {

  const [result, setResult] = useState <string>();

  function showResult(){
    let num : number = Math.floor(Math.random() * 6);

    switch (num) {
      case 0:
        setResult("SIM...");
        break;
      case 1:
        setResult("NAO...");
        break;
      case 2:
        setResult("TALVEZ SIM");
        break;
      case 3:
        setResult("TALVEZ NÃO");
        break;
      case 4:
        setResult("JAMAIS!");
        break;
    }
  }

  return (
    <View style={styles.container}>
      <Header></Header>
      
      <ImageBackground 
          source={require('./assets/wizarddd.png')} 
          style={styles.image}
        >
        <View style={styles.conteudoInferior}>
          <Text style={styles.textResult}> { result } </Text>
          
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton} onPress={showResult


            }>Responder</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}