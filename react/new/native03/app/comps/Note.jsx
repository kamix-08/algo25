import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Note = ({ data, deleteSelf, navigation }) => {
    function press() {
        navigation.navigate('edytuj', {
            note: data
        })
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
            <View style={{ alignSelf: 'flex-start' }}>
                <Text style={{ color: data.color, backgroundColor: 'white', padding: 5, borderRadius: 10, fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{data.cat}</Text>
            </View>
            <Text style={{ color: 'white', textAlign: 'right', fontSize: 12 }}>{data.date}</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{data.name}</Text>
            <Text style={{ fontSize: 14, color: 'white' }}>{data.desc}</Text>
        </TouchableOpacity>
    )
}

export default Note