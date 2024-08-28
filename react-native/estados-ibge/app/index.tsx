import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, FlatList} from "react-native";
import { Botao } from '@/components/Botao';
import { ibgeAPI } from '@/services/ibge.api';

interface Estado {
  id: number;
  nome: string;
  sigla: string;
  regiao: string
}

export default function Index() {

  const [estados, setEstados] = useState<Estado[]>([]);

  async function loadEstados(){
    const response = await ibgeAPI.get('?orderBy=nome')
    setEstados(response.data)
  }

  useEffect(() => {
    loadEstados();
  }, [])

  return (
    <View style={styles.container}>
      <FlatList<Estado>
        style={{flex: 1}}
        data={estados}
        keyExtractor={(estado) => String(estado.id)}
        renderItem={({item}) => {
          return(
            <View style={styles.itemEstado}> 
              <View style={styles.avatarSigla}>
                <Text style={styles.sigla}> {item.sigla} </Text>
              </View>
              <Text style={styles.estado}> {item.nome}</Text>
            </View>
          )
        }} 
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