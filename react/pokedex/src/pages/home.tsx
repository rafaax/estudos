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

    function getUrl(){
        axios.get("https://pokeapi.co/api/v2/pokemon?limit=10").then(
            (resp) => {
                setPokemons(resp.data.results);
                console.log(resp.data);
            }
        ).catch(
            (erro) => console.log(erro)
        )
    }
    
    
    return( 
        <div>
            <NavBar></NavBar>
            <Container maxWidth={false}>
                <Grid container>
                    {pokemons.map((pokemon, key) => (
                        <Grid item xs={3} key={key}>
                            <PokemonCard name={pokemon.name}></PokemonCard>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}