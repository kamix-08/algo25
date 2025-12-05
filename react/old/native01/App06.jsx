import { StyleSheet, Text, View } from 'react-native';

import Item06 from './components/Item06';

export default function App() {
    const colors = ['red', 'yellow', 'aqua', 'orange', 'lime', 'violet']

    return (
        <View style={{
            flex: 1,
            flexDirection: 'row'
        }}>
            {
                Array(3).fill(0).map((_, idx) => (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row'
                    }} key={idx}>
                        <View style={styles.container}>
                            {
                                colors.map((col, id) => (
                                    <Item06 key={id} color={col} num={id + 1} />
                                ))
                            }
                        </View>

                        <View style={{...styles.container, flexDirection: 'column-reverse'}}>
                            {
                                colors.map((col, id) => (
                                    <Item06 key={id} color={col} num={id + 1} />
                                ))
                            }
                        </View>
                    </View>
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
});