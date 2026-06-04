import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import * as SecureStore from 'expo-secure-store'

const BackupScreen = () => {
    function getAddr() {
        const a = SecureStore.getItem('addr')

        if (!a) {
            alert('Podaj adres serwera w ustawieniach')
            return null
        }

        const addr = JSON.parse(a)

        if (!addr.ip || !addr.port) {
            alert('Podaj adres serwera w ustawieniach')
            return null
        }

        return addr
    }

    async function backup() {
        const addr = getAddr()

        if (!addr)
            return

        const n = SecureStore.getItem('notes')
        const notes = n ? JSON.parse(n) : []

        try {
            await fetch(`http://${addr.ip}:${addr.port}/api/task`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tasks: notes })
            })
            alert('Backup wykonany pomyślnie')
        } catch (error) {
            alert('Wystąpił błąd.')
        }
    }

    async function restore() {
        const addr = getAddr()

        if (!addr)
            return

        try {   
            SecureStore.setItem('notes', JSON.stringify(await (fetch(`http://${addr.ip}:${addr.port}/api/task`)).then(res => res.json())))
            alert('Backup przywrócony pomyślnie')
        } catch (error) {
            alert('Wystąpił błąd.')
        }
    }

    return (
        <View>
            <TouchableOpacity onPress={backup} style={{ padding: 15, backgroundColor: 'orange', borderRadius: 30, margin: 'auto', marginTop: 40, width: '60%' }}>
                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>WYKONAJ BACKUP</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={restore} style={{ padding: 15, backgroundColor: 'orange', borderRadius: 30, margin: 'auto', marginTop: 20, width: '60%' }}>
                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>PRZYWRÓĆ BACKUP</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BackupScreen