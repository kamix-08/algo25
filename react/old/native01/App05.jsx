import { StyleSheet, Text, View } from 'react-native';

import Item03 from './components/Item03';

export default function App() {
    const colors = ['red', 'yellow', 'aqua', 'orange', 'lime', 'violet']

    return (
        <View style={{
            flex: 1,
            flexDirection: 'row'
        }}>
            <View style={styles.container}>
                {
                    colors.map((ele, idx) => (
                        <Item03 fg={'white'} color={ele} id={idx} key={idx} />
                    ))
                }
            </View>

            <View style={{
                ...styles.container,
                flexDirection: 'column-reverse'
            }}>
                {
                    colors.map((ele, idx) => (
                        <Item03 fg={'black'} color={ele} id={idx} key={idx} />
                    ))
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "50%",
        justifyContent: 'center'
    },
});