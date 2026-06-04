import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import Note from './../comps/Note'

const MainScreen = ({ navigation }) => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')

    function deleteNote(id) {
        const n = SecureStore.getItem('notes')
        const notes = n ? JSON.parse(n) : []

        SecureStore.setItem('notes', JSON.stringify(notes.filter(ele => ele._id != id)))
        setData(d => d.filter(e => e._id != id))
    }

    function deleteAll() {
        SecureStore.setItem('notes', '[]')
        setData([])
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

            <TouchableOpacity onPress={deleteAll} style={{ margin: 'auto', padding: 15, backgroundColor: 'orange', borderRadius: 30, width: '60%', marginBottom: 10 }}>
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>USUŃ WSZYSTKIE NOTATKI</Text>
            </TouchableOpacity>

            <FlatList
                numColumns='2'
                data={data.filter(d => f(d.name) || f(d.desc) || f(d.cat))}
                renderItem={({ item }) => <Note data={item} deleteSelf={() => deleteNote(item._id)} navigation={navigation} />}
                keyExtractor={item => item._id}
            />
        </View>
    )
}

export default MainScreen