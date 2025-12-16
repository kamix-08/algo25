import { StyleSheet, Text, View } from 'react-native';
import Board from './components/Board';

export default function App() {
	return (
		<View style={styles.body}>
			<Board />
		</View>
	);
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		boxSizing: 'border-box',
	}
});
