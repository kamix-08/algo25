import { View, Text, StatusBar } from 'react-native'
import { useState } from 'react'
import Item08 from './comps/Item08'

const App08 = () => {
    const colors = ["violet", "green", "orange", "blue", "brown", "red"]

    const [pressed, setPressed] = useState(0)

    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            {
                Array(6).fill(0).map((_, i) => (
                    <View key={i} style={{ flex: 1, flexDirection: 'column' }}>
                        {
                            colors.map((color, j) => (
                                <Item08 key={j} color={color} number={6 - j} pressed={pressed} setPressed={setPressed} />
                            ))
                        }
                    </View>
                ))
            }

            <StatusBar />
        </View>
    )
}

export default App08