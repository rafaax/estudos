import { useRoute } from "@react-navigation/native"
import React, { useEffect, useState } from "react" 
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Estado } from "./Home";
import { ibgeAPI } from "../../services/ibge.api";
import { ItemMunicipio } from "../ItemMunicipio";


interface Params {
    estado: Estado
}

export interface Municipios {
    id: number;
    nome: string
}

export function Municipios() {

    const [municipios, setMunicipios] = useState<Municipios[]>([])

    async function loadMunicipios(){
        const response = await ibgeAPI.get(`/${estado.id}/municipios?orderBy=nome`)
        setMunicipios(response.data)
    }

    useEffect(() => {
        loadMunicipios();
    }, [])

    const route = useRoute();
    const {estado} =  route.params as Params



    return (
        
        <View style={styles.container}>
            <FlatList<Municipios>
                style={{flex: 1}}
                showsVerticalScrollIndicator={false}
                data={municipios}
                keyExtractor={(municipios) => String(municipios.id)}
                renderItem={({item}) => (
                    <ItemMunicipio item={item} /> 
                )} 
            ></FlatList>
        </View>
    )
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