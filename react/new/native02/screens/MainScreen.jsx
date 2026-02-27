import { TextInput, View } from 'react-native'
import { useState } from 'react'

import settings from '../settings.json'
import MyButton from '../comps/MyButton'

const MainScreen = ({ navigation }) => {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    async function register() {
        fetch(`http://${settings.address}:${settings.port}/register`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                login, password
            }),
            cache: 'no-cache'
        })
            .then(r => {
                if (r.status == 467) {
                    alert('this user already exists')
                    return
                }

                if (r.status == 200) {
                    navigation.navigate("dashboard")
                }
            })
    }

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TextInput value={login} onChangeText={setLogin} style={{borderBottomWidth: 1, width: 200}} />
            <TextInput value={password} onChangeText={setPassword} style={{borderBottomWidth: 1, width: 200}} />

            <MyButton color='blue' textColor='white' text='Register' callback={register} />
        </View>
    )
}

export default MainScreen