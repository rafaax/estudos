import React from "react";
import { Home } from "./components/pages/Home";
import { Municipios } from "./components/pages/Municipios"
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";



const Stack = createStackNavigator();

export default function App() {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Estados" component={Home} />
                <Stack.Screen name="Municipios" component={Municipios} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}