import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import Home from "@/app-municipios/components/Home";
import { Municipios } from "@/app-municipios/components/Municipios";



const Stack = createStackNavigator();

function Index() {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Municipios" component={Municipios} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}