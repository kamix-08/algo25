import { StyleSheet, Text, View } from 'react-native';

import Item02 from './components/Item02';

export default function App() {
    return (
        <View style={styles.container}>
            <Item02 fg={'white'} size={32} bg={'red'} name={'header'} />
            <Item02 fg={'white'} size={32} bg={'green'} name={'content'} />
            <Item02 fg={'white'} size={32} bg={'blue'} name={'footer'} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});