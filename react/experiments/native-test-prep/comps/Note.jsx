import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Note = ({data, setDetails}) => {
    function onPress() {
        setDetails(data.id-1)
    }

    return (
        <TouchableOpacity style={{backgroundColor: data.clr}} onPress={onPress} onLongPress={() => setDetails(-1)}>
            <Text>{data.title}</Text>
            <Text>{data.desc}</Text>
        </TouchableOpacity>
    )
}

export default Note

const styles = StyleSheet.create({})