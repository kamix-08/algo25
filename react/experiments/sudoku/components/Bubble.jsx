import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Bubble = ({ callback }) => {
    const options = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

    return (
        <View>
            {
                options.map(o => (
                    <TouchableOpacity key={o} onPress={() => callback(o)}>
                        <Text>{o}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

export default Bubble

const styles = StyleSheet.create({})