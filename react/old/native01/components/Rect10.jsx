import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'

const Rect10 = () => {
    const [pressed, setPressed] = useState(false)

    const randomVal = () => {
        return Math.floor(Math.random() * 256)
    }

    const randomColor = () => {
        return `rgb(${randomVal()}, ${randomVal()}, ${randomVal()})`
    }

    return pressed ? <></> : (
        <TouchableOpacity style={{
            flex: 1,
            backgroundColor: randomColor(),
            width: "100%",
            height: "100%"
        }} onPress={() => setPressed(true)}></TouchableOpacity>
    )
}

export default Rect10

const styles = StyleSheet.create({})