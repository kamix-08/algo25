import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import * as SecureStore from 'expo-secure-store';

import {address, port} from './../settings.json'

const LoginScreen = ({navigation}) => {
    const [login, setLogin] = React.useState()
    const [pass, setPass] = React.useState()

    function onPress() {
        console.log('f')

        fetch(`http://${address}:${port}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                login, pass
            }),
            cache: 'no-cache'
        })
            .then(r => {
                if (r.status == 200) {
                    alert('zalogowano poprawnie')
                    navigation.navigate('Notatki')
                    SecureStore.setItem('session', 'valid')

                    return
                }

                alert(JSON.stringify(r, null, 2))
            })
    }

    return (
        <View style={{flex:1}}>
            <View style={{backgroundColor: 'orange', width: '150%', position: 'absolute', left: '-25%', borderRadius: '50%', height: 250, top: -125}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100}}>
                    <Text style={{color: 'white', fontSize: 24}}>Register</Text>
                    <Text style={{fontSize: 16}}>sign in</Text>
                </View>
            </View>

            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <TextInput onChangeText={setLogin} value={login} style={{borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 40, width: '80%'}} />
                <TextInput onChangeText={setPass} value={pass} style={{borderBottomColor: 'black', borderBottomWidth: 1, width: '80%', marginBottom: 60}} />

                <TouchableOpacity onPress={onPress} style={{backgroundColor: 'orange', padding: 15, borderRadius: 10}}>
                    <Text style={{color: 'white'}}>register/login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen