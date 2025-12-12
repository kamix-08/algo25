import { StyleSheet, TextInput } from 'react-native'
import { useState } from 'react'
import MyButton from '../components/MyButton'
import settings from './../settings.json'
import { SafeAreaView } from 'react-native-safe-area-context'

const MainScreen = ({ navigation }) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = () => {
        fetch(settings.address + ':' + settings.port + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: login,
                password: password
            })
        })
            .then(res => {
                if (res.status == 200) {
                    navigation.navigate("panel")
                    return
                }

                if (res.status == 403) {
                    alert("Niepoprawne dane logowania!")
                    return
                }

                alert(JSON.stringify(res, null, 2))
            })
    }

    return (
        <SafeAreaView>
            <TextInput value={login} onChangeText={setLogin} placeholder='Login...' />
            <TextInput value={password} onChangeText={setPassword} placeholder='Hasło...' secureTextEntry={true} />

            <MyButton text='Zarejestruj' callback={onSubmit} />
        </SafeAreaView>
    )
}

export default MainScreen

const styles = StyleSheet.create({})