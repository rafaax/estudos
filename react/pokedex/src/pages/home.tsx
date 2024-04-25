import React from 'react'
import PokemonCard from '../components/card.tsx'
import NavBar from '../components/navbar.tsx'
import { Container, Grid } from '@mui/material'

export const Home = () => {
    return( 
        <div>
            <NavBar>
                
            </NavBar>
            <Container maxWidth={false}>
                <Grid container>
                    <Grid item xs={3}>
                        <PokemonCard></PokemonCard>
                        <PokemonCard></PokemonCard>
                        <PokemonCard></PokemonCard>
                    </Grid>
                    <Grid item xs={3}>
                        <PokemonCard></PokemonCard>
                        <PokemonCard></PokemonCard>
                        <PokemonCard></PokemonCard>
                    </Grid>
                    <Grid item xs={3}>
                        <PokemonCard></PokemonCard>
                        <PokemonCard></PokemonCard>
                        <PokemonCard></PokemonCard>
                    </Grid>
                    <Grid item xs={3}>
                        <PokemonCard></PokemonCard>
                        <PokemonCard></PokemonCard>
                        <PokemonCard></PokemonCard>
                    </Grid>
                    
                </Grid>
                
            </Container>
        </div>
    )
}