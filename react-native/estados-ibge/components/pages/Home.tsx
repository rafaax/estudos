import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity} from "react-native";
import { ibgeAPI } from '../../services/ibge.api';
import { useNavigation } from '@react-navigation/native';
import { ItemEstado } from '../ItemEstado';

export interface Estado {
  id: number;
  nome: string;
  sigla: string;
  regiao: string
}

export function Home() {

  const [estados, setEstados] = useState<Estado[]>([]);
  const navigation = useNavigation();

  async function loadEstados(){
    const response = await ibgeAPI.get('?orderBy=nome')
    setEstados(response.data)
  }

  function handleToMunicipios(item: Estado){
    navigation.navigate("Municipios", { estado: item })
  }

  useEffect(() => {
    loadEstados();
  }, [])

  return (
    <View style={styles.container}>
      <FlatList<Estado>
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        data={estados}
        keyExtractor={(estado) => String(estado.id)}
        renderItem={({item}) => (
          <ItemEstado item={item} onPress={() => handleToMunicipios(item)} /> 
        )} 
        ></FlatList>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#eee',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemEstado: {
    paddingVertical: 10, 
    marginTop: 5,
    backgroundColor: 'white',
    flexDirection: 'row', 
    borderRadius: 10,
  },
  avatarSigla: {
    width: 60,
    height: 60,
    backgroundColor: '#E76F51',
    borderRadius: 30, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  sigla : {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: 'white',
    marginHorizontal: 10
  },
  estado : {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#254653',
    marginLeft: 10,
    alignSelf: 'center'
  }
})