import React from "react";
import { Home } from "./components/Home";
import { Municipios } from "./components/Municipios"



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