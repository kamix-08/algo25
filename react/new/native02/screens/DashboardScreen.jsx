import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'

import settings from './../settings.json'
import UserItem from '../comps/UserItem'

const DashboardScreen = ({ navigation }) => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(`http://${settings.address}:${settings.port}/db`)
            .then(r => r.json())
            .then(setData)
    }, [])

    return (
        <View>
            <FlatList 
                data={data}
                renderItem={({item}) => <UserItem data={item} navigation={navigation} setData={setData} />}
            />
        </View>
    )
}

export default DashboardScreen