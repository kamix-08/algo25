import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Note = ({ data, deleteSelf }) => {
    function press() {
        alert(data.desc)
    }

    function longPress() {
        Alert.alert('Delete?', 'This action is irreversible', [
            {
                text: 'CANCEL',
                style: 'cancel'
            },
            {
                text: 'OK',
                onPress: deleteSelf
            }
        ])
    }

    return (
        <TouchableOpacity onPress={press} onLongPress={longPress} style={{ backgroundColor: data.color, borderRadius: 15, padding: 20, margin: '2.5%', width: '45%', aspectRatio: 1 }}>
            <Text style={{ color: 'white', textAlign: 'right' }}>{data.date}</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{data.name}</Text>
            <Text style={{ fontSize: 16, color: 'white' }}>{data.desc}</Text>
        </TouchableOpacity>
    )
}

export default Note

const styles = StyleSheet.create({})