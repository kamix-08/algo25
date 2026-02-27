import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import MyButton from './MyButton'
import settings from './../settings.json'

const UserItem = ({ data, setData, navigation }) => {
    function details() {
        navigation.navigate("details", {
            data
        })
    }

    function deleteUsr() {
        setData(d => d.filter(e => e.login != data.login))
        fetch(`http://${settings.address}:${settings.port}/delete/${data.login}`)
    }

    return (
        <View>
            <Text>login: {data.login}</Text>

            <MyButton color='blue' textColor='white' text='details' callback={details} />
            <MyButton color='blue' textColor='white' text='delete' callback={deleteUsr} />
        </View>
    )
}

export default UserItem