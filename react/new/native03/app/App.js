import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import CustomDrawerContent from './comps/CustomDrawerContent'

import MainScreen from './screens/MainScreen'
import AddNoteScreen from './screens/AddNoteScreen'
import AddCategoryScreen from './screens/AddCategoryScreen'

import { Ionicons } from '@react-native-vector-icons/ionicons'
import SettingsScreen from './screens/SettingsScreen';

const Drawer = createDrawerNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
				<Drawer.Screen name='notatki' component={MainScreen} options={{
					headerStyle: { backgroundColor: 'orange' }, headerTintColor: 'white',
					drawerIcon: () => <Ionicons name='document-text' size={28} color='green' />
				}} />

				<Drawer.Screen name='dodaj notatkę' component={AddNoteScreen} options={{
					headerStyle: { backgroundColor: 'orange' }, headerTintColor: 'white',
					drawerIcon: () => <Ionicons name='add-circle' size={28} color='blue' />
				}} />

				<Drawer.Screen name='dodaj kategorię' component={AddCategoryScreen} options={{
					headerStyle: { backgroundColor: 'orange' }, headerTintColor: 'white',
					drawerIcon: () => <Ionicons name='add-circle' size={28} color='orange' />
				}} />

				<Drawer.Screen name='ustawienia' component={SettingsScreen} options={{
					headerStyle: { backgroundColor: 'orange' }, headerTintColor: 'white', headerTitle: 'ustawienia serwera',
					drawerIcon: () => <Ionicons name='settings' size={28} color='blue' />
				}} />

				<Drawer.Screen name='backup' component={AddCategoryScreen} options={{
					headerStyle: { backgroundColor: 'orange' }, headerTintColor: 'white',
					drawerIcon: () => <Ionicons name='cloud' size={28} color='orange' />
				}} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}