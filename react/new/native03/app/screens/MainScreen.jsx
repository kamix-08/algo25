import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native'
import { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import Note from './../comps/Note'

const MainScreen = ({ navigation }) => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')

    function deleteNote(id) {
        const n = SecureStore.getItem('notes')
        const notes = n ? JSON.parse(n) : []

        SecureStore.setItem('notes', JSON.stringify(notes.filter(ele => ele.key != id)))
        setData(d => d.filter(e => e.key != id))
    }

    useEffect(() => {
        return navigation.addListener('focus', () => {
            const d = SecureStore.getItem('notes')
            setData(d ? JSON.parse(d) : [])
        })
    }, [navigation])

    const f = s => s.toLowerCase().includes(search.toLowerCase())

    return (
        <View>
            <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder='SZUKAJ NOTATKI...'
                style={{ backgroundColor: 'lightgray', borderRadius: 20, margin: 10, marginTop: 20, padding: 10, fontWeight: 'bold' }}
            />

            <FlatList
                numColumns='2'
                data={data.filter(d => f(d.name) || f(d.desc) || f(d.cat))}
                renderItem={({ item }) => <Note data={item} deleteSelf={() => deleteNote(item.key)} />}
                keyExtractor={item => item.key}
            />
        </View>
    )
}

export default MainScreen