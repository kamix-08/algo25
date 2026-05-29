import { Text, View } from 'react-native'
import React from 'react'
import * as SecureStore from 'expo-secure-store'
import { useState, useEffect } from 'react'
import Dialog from "react-native-dialog"

const SettingsScreen = ({ navigation }) => {
    const [ip, setIp] = useState('')
    const [port, setPort] = useState('')
    
    const [popup, setPopup] = useState(false)

    useEffect(() => {
        return navigation.addListener('input', () => {
            const a = SecureStore.getItem('addr')
            
            if (a) {
                const addr = JSON.parse(a)
                setIp(addr.ip)
                setPort(addr.port)
            }
        })
    }, [navigation])

    return (
        <View>
            <Text>Obecnie zapisane IP:</Text>
            <Text>{ip}</Text>

            <Text>Obecnie zapisany PORT:</Text>
            <Text>{port}</Text>

            <Dialog.Container visible={true}>
                <Dialog.Title>Adres serwera</Dialog.Title>
                <Dialog.Description>Edytuj dane</Dialog.Description>

                <Dialog.Input label='IP' />
                <Dialog.Input label='PORT' />

                <Dialog.Button label="CANCEL" />
                <Dialog.Button label="SAVE" />
            </Dialog.Container>
        </View>
    )
}

export default SettingsScreen