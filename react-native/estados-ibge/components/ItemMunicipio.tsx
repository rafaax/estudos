import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Municipios } from "./pages/Municipios";

interface ItemMunicipioProps extends TouchableOpacityProps {
    item: Municipios
}

export function ItemMunicipio({item, ...rest} : ItemMunicipioProps){
    return (
        <TouchableOpacity style={styles.itemEstado} {...rest}> 
          <Text style={styles.estado}> {item.nome}</Text>
        </TouchableOpacity>
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