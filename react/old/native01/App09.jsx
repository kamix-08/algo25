import { StyleSheet, Text, View } from 'react-native';
import Circle09 from './components/Circle09';

export default function App() {
    return (
        <View style={styles.container}>
            <Circle09 />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});