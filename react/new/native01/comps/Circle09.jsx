import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'

const Circle09 = () => {
    const [pressed, setPressed] = useState(false)

    function rnd() {
        return '#' + (Math.floor(Math.random() * (0xffffff - 0x100000 + 1)) + 0x100000).toString(16)
    }

    if (!pressed) {
        return (
            <TouchableOpacity style={{backgroundColor: rnd(), borderRadius: '50%', aspectRatio: 1, flex: 1}} onPress={() => setPressed(true)} />
        )
    }

    return (
        <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'column'}}>
                <Circle09 />
                <Circle09 />
            </View>

            <View style={{flex: 1, flexDirection: 'column'}}>
                <Circle09 />
                <Circle09 />
            </View>
        </View>
    )
}

export default Circle09

const styles = StyleSheet.create({})