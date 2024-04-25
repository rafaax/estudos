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

    console.log(pokemons);
    
    return( 
        <div>
            <NavBar></NavBar>
            <Container maxWidth={false} >
                <Grid container spacing={3}>
                    {pokemons.map((pokemon, key) => (
                        <Grid item xs={2} key={key}>
                            <PokemonCard name={pokemon.data.name} photo={pokemon.data.sprites.front_default}></PokemonCard>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}