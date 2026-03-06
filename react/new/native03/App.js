import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Image } from 'react-native'

import CustomDrawerContent from './comps/CustomDrawerContent'

import MainScreen from './screens/MainScreen'
import AsideScreen from './screens/AsideScreen'

import Icon from './assets/icon.png'

const Drawer = createDrawerNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
				<Drawer.Screen name='Notatki' component={MainScreen} />
				<Drawer.Screen name='Dodaj notatke' component={AsideScreen} options={{
					drawerIcon: () => <Image style={{ width: 50, height: 50 }} source={Icon} />
				}} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}