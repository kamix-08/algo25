import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Item06 from './components/Item06';

export default function App() {
    const colors = ['red', 'yellow', 'aqua', 'orange', 'lime', 'violet']

    const onPress = (x,y,v) => {
        alert(`row = ${y}\ncolumn = ${x}\nvalue = ${v}`)
    }

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
                                    <TouchableOpacity key={id} style={{
                                        flex: 1
                                    }} onPress={() => onPress(2 * idx + 1, id + 1, id + 1)} >
                                        <Item06 color={col} num={id + 1} />
                                    </TouchableOpacity>
                                ))
                            }
                        </View>

                        <View style={{...styles.container, flexDirection: 'column-reverse'}}>
                            {
                                colors.map((col, id) => (
                                    <TouchableOpacity key={id} style={{
                                        flex: 1
                                    }} onPress={() => onPress(2 * (idx + 1), colors.length - id, id + 1)} >
                                        <Item06 color={col} num={id + 1} />
                                    </TouchableOpacity>
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