import { useRoute } from "@react-navigation/native"
import React, { useEffect, useState } from "react" 
import { Text, View } from 'react-native'
import { Estado } from "./Home";
import { ibgeAPI } from "../../services/ibge.api";


interface Params {
    estado: Estado
}

interface Municipios {
    id: number;
    nome: string
}

export function Municipios() {

    const [municipios, setMunicipios] = useState<Municipios[]>([])

    async function loadMunicipios(){
        const response = await ibgeAPI.get<Municipios[]>(`/${estado.id}/municipios?orderBy=nome`)
        setMunicipios(response.data)
    }

    useEffect(() => {
        loadMunicipios();
    }, [])

    const route = useRoute();
    const {estado} =  route.params as Params
    return (
        <View>
            <Text> Municipios do {estado.nome}</Text>
        </View>
    )
}