import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { useState, useEffect } from 'react'
import { Picker } from '@react-native-picker/picker'

const EditNoteScreen = ({ navigation, route }) => {
    const [note, setNote] = useState({})
    const [categories, setCategories] = useState([])

    const [name, setName] = useState()
    const [desc, setDesc] = useState()
    const [cat, setCat] = useState()

    const colors = ['#4EB6AD', '#F16393', '#65B4F6', '#9476CC']

    function submit() {
        const n = SecureStore.getItem('notes')
        const notes = n ? JSON.parse(n) : []

        SecureStore.setItem('notes', JSON.stringify(notes.map(e => {
            if (e.key != note.key)
                return e

            const d = new Date()

            return {
                name: name, desc: desc, cat: cat,
                key: e.key, color: e.color, 
                date: d.toLocaleString('default', { day: '2-digit', month: 'short' }).toUpperCase()
            }
        })))

        navigation.navigate('notatki')
    }

    useEffect(() => {
        return navigation.addListener('focus', () => {
            const c = SecureStore.getItem('categories')
            setCategories(c ? JSON.parse(c) : ['ogólne'])
        })
    }, [navigation])

    useEffect(() => {
        const n = route.params.note

        setNote(n)
        setName(n.name)
        setDesc(n.desc)
        setCat(n.cat)
    }, [route.params.note])

    return (
        <View style={{ marginTop: 50 }}>
            <TextInput value={name} style={{ borderBottomWidth: 1, borderColor: 'black', width: '80%', margin: 'auto', fontWeight: 'bold' }} onChangeText={setName} />
            <TextInput value={desc} style={{ borderBottomWidth: 1, borderColor: 'black', width: '80%', margin: 'auto', fontWeight: 'bold', marginTop: 20 }} onChangeText={setDesc} />

            <Picker 
                selectedValue={cat}
                onValueChange={setCat}
                style={{backgroundColor: 'orange', width: '60%', margin: 'auto', marginTop: 20}}
            >
                {
                    categories.map((c, i) => (
                        <Picker.Item key={i} label={c.toUpperCase()} value={c} />
                    ))
                }
            </Picker>

            <TouchableOpacity onPress={submit} style={{ margin: 'auto', padding: 15, backgroundColor: 'orange', borderRadius: 30, width: '60%', marginTop: 40 }}>
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>OK</Text>
            </TouchableOpacity>
        </View>
    )
}

export default EditNoteScreen