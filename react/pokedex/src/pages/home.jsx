import React, { useEffect, useState } from 'react'
import PokemonCard from '../components/card.tsx'
import NavBar from '../components/navbar.tsx'
import { Container, Grid } from '@mui/material'
import axios from "axios"

export const Home = () => {
    
    const [pokemons, setPokemons] = useState([])

    useEffect(() => {
        getUrl()
    }, [])

    const getUrl = () => {

        var endpoints = [];

        for (var i = 1; i < 10; i++){
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        }

        axios.all(
            endpoints.map(
                (endpoint) => axios.get(endpoint)
            )
        ).then(
            (res) => {
                setPokemons(res)
            } 
        )
    }
    
    return( 
        <div>
            <NavBar></NavBar>
            <Container maxWidth={false}>
                <Grid container>
                    {pokemons.map((pokemon, key) => (
                        <Grid item xs={3} key={key}>
                            <PokemonCard name={pokemon.data.name}></PokemonCard>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}