import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import Note from './../comps/Note'

const MainScreen = ({ navigation }) => {
    const [data, setData] = useState([])

    function deleteNote(id) {
        const n = SecureStore.getItem('notes')
        const notes = n ? JSON.parse(n) : []

        SecureStore.setItem('notes', JSON.stringify(notes.filter(ele => ele.key != id)))
        setData(d => d.filter(e => e.key != id))
    }

    useEffect(() => {
        const listener = navigation.addListener('focus', () => {
            const d = SecureStore.getItem('notes')
            setData(d ? JSON.parse(d) : [])
        })

        return listener
    }, [navigation])

    return (
        <View>
            <FlatList
                numColumns='2'
                data={data}
                renderItem={({ item }) => <Note data={item} deleteSelf={() => deleteNote(item.key)} />}
                keyExtractor={item => item.key}
            />
        </View>
    )
}

export default MainScreen