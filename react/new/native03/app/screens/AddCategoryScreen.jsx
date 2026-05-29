import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { useState } from 'react'

const AddCategoryScreen = () => {
    const [name, setName] = useState()

    function submit() {
        const c = SecureStore.getItem('categories')
        const categories = c ? JSON.parse(c) : ['ogólne']

        SecureStore.setItem('categories', JSON.stringify([
            ...categories,
            name
        ]))

        setName('')
    }

    return (
        <View style={{ marginTop: 50 }}>
            <TextInput value={name} style={{ borderBottomWidth: 1, borderColor: 'black', width: '80%', margin: 'auto', fontWeight: 'bold' }} onChangeText={setName} />

            <TouchableOpacity onPress={submit} style={{ margin: 'auto', padding: 15, backgroundColor: 'orange', borderRadius: 30, width: '60%', marginTop: 40 }}>
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>DODAJ KATEGORIĘ</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddCategoryScreen