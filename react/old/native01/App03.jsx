import { StyleSheet, Text, View } from 'react-native';

import Item03 from './components/Item03';

export default function App() {
    const colors = ['red', 'yellow', 'aqua', 'orange', 'lime', 'violet']

    return (
        <View style={styles.container}>
            {
                colors.map((ele, idx) => (
                    <Item03 color={ele} id={idx} key={idx} />
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});