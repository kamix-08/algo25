import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { useState } from 'react'

const AsideScreen = () => {
    const [name, setName] = useState()
    const [desc, setDesc] = useState()

    const colors = ['pink', 'lime', 'red', 'beige', 'orange', 'violet']

    function submit() {
        const n = SecureStore.getItem('notes')
        const notes = n ? JSON.parse(n) : []

        const id = notes.reduce((a, b) => Math.max(a, b.key), 0) + 1

        SecureStore.setItem('notes', JSON.stringify([
            ...notes,
            { name: name, desc: desc, key: id, color: colors[Math.floor(Math.random() * colors.length)] }
        ]))

        setName('')
        setDesc('')
    }

    return (
        <View>
            <Text>nazwa:</Text>
            <TextInput value={name} style={{ borderBottomWidth: 1, borderColor: 'black', width: 120 }} onChangeText={setName} />
            <Text>opis:</Text>
            <TextInput value={desc} style={{ borderBottomWidth: 1, borderColor: 'black', width: 120 }} onChangeText={setDesc} />

            <TouchableOpacity onPress={submit}>
                <Text>dodaj</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AsideScreen