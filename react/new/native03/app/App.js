import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import CustomDrawerContent from './comps/CustomDrawerContent'

import MainScreen from './screens/MainScreen'
import AddNoteScreen from './screens/AddNoteScreen'
import AddCategoryScreen from './screens/AddCategoryScreen'

import { Ionicons } from '@react-native-vector-icons/ionicons'
import SettingsScreen from './screens/SettingsScreen';
import EditNoteScreen from './screens/EditNoteScreen';

const Drawer = createDrawerNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
				<Drawer.Screen name='notatki' component={MainScreen} options={{
					headerStyle: { backgroundColor: 'orange' }, headerTintColor: 'white'
				}} />

				<Drawer.Screen name='dodaj' component={AddNoteScreen} options={{
					headerStyle: { backgroundColor: 'orange' }, headerTintColor: 'white', headerTitle: 'dodaj notatkę'
				}} />

				<Drawer.Screen name='edytuj' component={EditNoteScreen} options={{
					headerStyle: { backgroundColor: 'orange' }, headerTintColor: 'white', headerTitie: 'edytuj notatkę'
				}} />

				<Drawer.Screen name='kategorie' component={AddCategoryScreen} options={{
					headerStyle: { backgroundColor: 'orange' }, headerTintColor: 'white', headerTitle: 'dodaj kategorię'
				}} />

				<Drawer.Screen name='ustawienia' component={SettingsScreen} options={{
					headerStyle: { backgroundColor: 'orange' }, headerTintColor: 'white', headerTitle: 'ustawienia serwera'
				}} />

				<Drawer.Screen name='backup' component={AddCategoryScreen} options={{
					headerStyle: { backgroundColor: 'orange' }, headerTintColor: 'white', headerTitle: 'backup danych'
				}} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}