import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from "./screens/MainScreen"
import UsersScreen from "./screens/UsersScreen"
import DetailsScreen from "./screens/DetailsScreen"

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="main" component={MainScreen} options={{
                    headerShown: false
                }} />

                <Stack.Screen name="panel" component={UsersScreen} options={{
                    title: 'Panel administratora'
                }} />

                <Stack.Screen name="details" component={DetailsScreen} options={{
                    title: 'Szczegóły użytkownika'
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;