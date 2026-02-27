import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const MyButton = ({ color, textColor, text, callback }) => {
    return (
        <TouchableOpacity onPress={callback} style={{ backgroundColor: color, padding: 10, borderRadius: '5%' }}>
            <Text style={{color: textColor ? textColor : 'black'}}>{text}</Text>
        </TouchableOpacity>
    )
}

export default MyButton