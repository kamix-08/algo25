import { StyleSheet, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MyButton from '../components/MyButton'
import settings from './../settings.json'
import ListItem from '../components/ListItem'

const UsersScreen = ({ navigation }) => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(settings.address + ':' + settings.port + '/users')
            .then(data => data.json())
            .then(data => {
                setData(data.map((d, i) => { return {
                    ...d,
                    id: i
                }}))
            })
    }, [])

    return (
        <SafeAreaView>
            <MyButton text='wyloguj' callback={() => { navigation.navigate('main') }} />

            <FlatList 
                data={data}
                renderItem={({item}) => (<ListItem navigation={navigation} data={item} />)}
                keyExtractor={item => item.login}
            />
        </SafeAreaView>
    )
}

export default UsersScreen

const styles = StyleSheet.create({})