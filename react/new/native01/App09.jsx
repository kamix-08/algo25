import { View, StatusBar } from 'react-native'
import Circle09 from './comps/Circle09'

const App09 = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{width: "100%", aspectRatio: 1}}>
                <Circle09 />
                <StatusBar />
            </View>
        </View>
    )
}

export default App09