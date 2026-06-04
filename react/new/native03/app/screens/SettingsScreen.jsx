import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import * as SecureStore from 'expo-secure-store'
import { useState, useEffect } from 'react'
import Dialog from "react-native-dialog"

const SettingsScreen = ({ navigation }) => {
    const [ip, setIp] = useState('')
    const [port, setPort] = useState('')
    
    const [popup, setPopup] = useState(false)

    function update() {
        SecureStore.setItem('addr', JSON.stringify({ ip, port }))
        setPopup(false)
    }

    useEffect(() => {
        const a = SecureStore.getItem('addr')
            
        if (a) {
            const addr = JSON.parse(a)
            setIp(addr.ip)
            setPort(addr.port)
        }
    }, [navigation])

    return (
        <View>
            <Text style={{textAlign: 'center', fontSize: 24, marginTop: 40}}>Obecnie zapisane IP:</Text>
            <Text style={{textAlign: 'center', fontSize: 22, color: 'orange'}}>{ip}</Text>

            <Text style={{textAlign: 'center', fontSize: 24, marginTop: 20}}>Obecnie zapisany PORT:</Text>
            <Text style={{textAlign: 'center', fontSize: 22, color: 'orange'}}>{port}</Text>

            <TouchableOpacity onPress={() => setPopup(true)} style={{padding: 15, backgroundColor: 'orange', borderRadius: 30, margin: 'auto', marginTop: 20, width: '60%'}}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Edytuj</Text>
            </TouchableOpacity>

            <Dialog.Container visible={popup}>
                <Dialog.Title>Adres serwera</Dialog.Title>
                <Dialog.Description>Edytuj dane</Dialog.Description>

                <Dialog.Input label='IP' onChangeText={setIp} value={ip} />
                <Dialog.Input label='PORT' onChangeText={setPort} value={port} />

                <Dialog.Button label="CANCEL" onPress={() => setPopup(false)} />
                <Dialog.Button label="SAVE" onPress={update} />
            </Dialog.Container>
        </View>
    )
}

export default SettingsScreen