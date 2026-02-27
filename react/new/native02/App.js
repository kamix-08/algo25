import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from "./screens/MainScreen"
import DashboardScreen from "./screens/DashboardScreen"
import DetailsScreen from './screens/DetailsScreen'

const Stack = createNativeStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="main" component={MainScreen} />
				<Stack.Screen name="dashboard" component={DashboardScreen} />
				<Stack.Screen name="details" component={DetailsScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;