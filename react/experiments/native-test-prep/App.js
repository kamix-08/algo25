import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'

import CustomDrawerContent from './comps/CustomDrawerContent';

import MainScreen from './screens/MainScreen';
import LoginScreen from './screens/LoginScreen';

import { Image } from 'react-native'
import Icon from './assets/icon.png'

export default function App() {
	const Drawer = createDrawerNavigator();

	return (
		<NavigationContainer>
			<Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
				<Drawer.Screen name="Notatki" component={MainScreen} options={{ headerStyle: { backgroundColor: 'orange' }, headerTintColor: 'white', drawerIcon: () => (<Image style={{ width: 25, height: 25 }} source={Icon}></Image>) }} />
				<Drawer.Screen name="Zaloguj" component={LoginScreen} options={{ headerStyle: { backgroundColor: 'orange' }, headerTintColor: 'white' }} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}