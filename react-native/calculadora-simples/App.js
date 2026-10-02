import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { styles }  from './src/components/StyleSheet'
import  { Header } from './src/components/Header'
import  { Body } from './src/components/Body'

export default function App() {
  
  return (
    <View style={styles.container}>

      <Header> </Header>

      <Body></Body>

    </View>
  );
}