import { FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import * as SecureStore from 'expo-secure-store';
import {address, port} from './../settings.json'

import Note from '../comps/Note';

const MainScreen = ({navigation}) => {
    const [notes, setNotes] = React.useState([])
    const [note, setNote] = React.useState({})
    const [details, setDetails] = React.useState(-1)

    const [title, setTitle] = React.useState('')
    const [desc, setDesc] = React.useState('')

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetch(`http://${address}:${port}/notes`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({session: SecureStore.getItem('session')}),
                cache: 'no-cache'
            })
                .then(r => {
                    if (r.status == 200)
                        return r.json()

                    alert('zaloguj się')
                    navigation.navigate('Zaloguj')
                })
                .then(setNotes)
        })

        return unsubscribe
    }, [])

    React.useEffect(() => {
        setNotes(n => {
            setNote(n[details])
            return n
        })
    }, [details])

    function onPress() {
        fetch(`http://${address}:${port}/add`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title, desc})
        })
    }

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <TextInput onChangeText={setTitle} value={title} style={{borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 40, width: '80%'}} />
                <TextInput onChangeText={setDesc} value={desc} style={{borderBottomColor: 'black', borderBottomWidth: 1, width: '80%', marginBottom: 60}} />

                <TouchableOpacity onPress={onPress} style={{backgroundColor: 'orange', padding: 15, borderRadius: 10}}>
                    <Text style={{color: 'white'}}>add note</Text>
                </TouchableOpacity>
            </View>

            <View style={{display: details == -1 ? 'none' : 'block'}}>
                <Text>{note?.title}</Text>
                <Text>{note?.desc}</Text>
            </View>

            <FlatList
                data={notes}
                renderItem={({item}) => <Note data={item} setDetails={setDetails} />}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default MainScreen

const styles = StyleSheet.create({})