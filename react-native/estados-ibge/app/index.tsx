import React from 'react'
import { View, StyleSheet} from "react-native";
import { Botao } from '@/components/Botao';

export default function Index() {
  return (
    <View style={styles.container}>
      <Botao titulo='+' />
      <Botao titulo='-' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  }
})