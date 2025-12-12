import { StyleSheet, Text, View } from 'react-native'
import MyButton from './MyButton'
import settings from './../settings.json'

const ListItem = ({ navigation, data }) => {
    const onDelete = async () => {
        await fetch(settings.address + ':' + settings.port + '/delete/' + data.login)
        navigation.replace('panel')
    }

    return (
        <View>
            <MyButton text='szczegóły' callback={() => { navigation.navigate('details', {
                login: data.login,
                password: data.password,
                date: data.date
            }) }} />
            <MyButton text='usuń' callback={onDelete} />

            <Text>{data.id}: {data.login}</Text>
        </View>
    )
}

export default ListItem

const styles = StyleSheet.create({})