import axios from 'axios';

export const ibgeAPI = axios.create({
    baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
})

export const ibgeAPI_municipios = axios.create({
    baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
})