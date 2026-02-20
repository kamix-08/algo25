import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Item11 = ({color, onPress}) => {
    return (
        <TouchableOpacity style={{backgroundColor: color, aspectRatio: 1, width: "20%"}} onPress={onPress} />
    )
}

export default Item11

const styles = StyleSheet.create({})