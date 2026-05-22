import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { useState } from 'react'

const AddNoteScreen = () => {
    const [name, setName] = useState()
    const [desc, setDesc] = useState()

    const colors = ['#4EB6AD', '#F16393', '#65B4F6', '#9476CC']

    function submit() {
        const n = SecureStore.getItem('notes')
        const notes = n ? JSON.parse(n) : []

        const id = notes.reduce((a, b) => Math.max(a, b.key), 0) + 1
        const d = new Date()

        SecureStore.setItem('notes', JSON.stringify([
            ...notes,
            {
                name: name, desc: desc, key: id, color: colors[Math.floor(Math.random() * colors.length)], date: d.toLocaleString('default', { day: '2-digit', month: 'short' }).toUpperCase()
            }
        ]))

        setName('')
        setDesc('')
    }

    return (
        <View style={{ marginTop: 50 }}>
            <TextInput value={name} style={{ borderBottomWidth: 1, borderColor: 'black', width: '80%', margin: 'auto', fontWeight: 'bold' }} onChangeText={setName} />
            <TextInput value={desc} style={{ borderBottomWidth: 1, borderColor: 'black', width: '80%', margin: 'auto', fontWeight: 'bold', marginTop: 20 }} onChangeText={setDesc} />

            <TouchableOpacity onPress={submit} style={{ margin: 'auto', padding: 15, backgroundColor: 'orange', borderRadius: 30, width: '60%', marginTop: 40 }}>
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>DODAJ</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddNoteScreen