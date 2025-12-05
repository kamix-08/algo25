import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'

const Circle09 = () => {
    const [pressed, setPressed] = useState(false)

    const randomColor = () => {
        return '#' + Math.floor(Math.random() * (0xFFFFFF - 0x100000 + 1) + 0x100000).toString(16)
    }

    return pressed ? (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <View style={{
                ...styles.row,
                alignItems: 'flex-end',
            }}>
                <Circle09 />
                <Circle09 />
            </View>
            <View style={{
                ...styles.row,
                alignItems: 'flex-start'
            }}>
                <Circle09 />
                <Circle09 />
            </View>
        </View>
    ) : (
        <TouchableOpacity style={{
            flex: 1,
            justifyContent: 'center'
        }} onPress={() => setPressed(true)}>
            <View style={{
                backgroundColor: randomColor(),
                aspectRatio: 1,
                borderRadius: "50%"
            }}></View>
        </TouchableOpacity>
    ) 
}

export default Circle09

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        height: 'min-content',
    }
})