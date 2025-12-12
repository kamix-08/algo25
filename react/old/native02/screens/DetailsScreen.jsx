import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const DetailsScreen = ({ navigation, route }) => {
    console.table(navigation)

    return (
        <SafeAreaView>
            <Text>login:</Text>
            <Text>{route.params.login}</Text>

            <Text>password:</Text>
            <Text>{route.params.password}</Text>
            
            <Text>registered:</Text>
            <Text>{route.params.date}</Text>
        </SafeAreaView>
    )
}

export default DetailsScreen

const styles = StyleSheet.create({})