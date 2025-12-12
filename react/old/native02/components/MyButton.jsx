import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

const MyButton = ({color, text, callback}) => {
    return (
        <TouchableOpacity onPress={callback} style={{
            backgroundColor: color
        }}>
            <Text>{text}</Text>
        </TouchableOpacity>
    )
}

export default MyButton