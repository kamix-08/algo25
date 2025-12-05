import { StyleSheet, Text, View } from 'react-native';
import Rect10 from './components/Rect10';

export default function App() {
    return (
        <View style={{
            ...styles.container,
            flexDirection: 'column'
        }}>
            {
                Array(8).fill(0).map((_, i) => (
                    <View key={i} style={{
                        ...styles.container,
                        flexDirection: 'row'
                    }}>
                        {
                            Array(8).fill(0).map((_, j) => (
                                <Rect10 key={j} />
                            ))
                        }
                    </View>
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});