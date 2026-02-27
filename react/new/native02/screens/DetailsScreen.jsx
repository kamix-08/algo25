import { Text, View } from 'react-native'

const DetailsScreen = ({ navigation, route }) => {
    return (
        <View>
            <Text>login: {route.params.data.login}</Text>
            <Text>password: {route.params.data.password}</Text>
        </View>
    )
}

export default DetailsScreen