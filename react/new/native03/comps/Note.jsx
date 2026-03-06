import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Note = ({ data, deleteSelf }) => {
    function press() {
        alert(data.desc)
    }

    function longPress() {
        Alert.alert('Delete?', 'ts fr no takies-backsies', [
            {
                text: 'nah im playin',
                style: 'cancel'
            },
            {
                text: 'yes twin',
                onPress: deleteSelf
            }
        ])
    }

    return (
        <TouchableOpacity onPress={press} onLongPress={longPress} style={{ flex: 1, backgroundColor: data.color, borderRadius: 15, padding: 20 }}>
            <Text>{data.name}</Text>
            <Text>{data.desc}</Text>
        </TouchableOpacity>
    )
}

export default Note

const styles = StyleSheet.create({})