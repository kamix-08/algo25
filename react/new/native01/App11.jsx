import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { useState } from 'react'
import Item11 from './comps/Item11'

const App11 = () => {
    const [board, setBoard] = useState(Array(5).fill(Array(5).fill(0)))

    const colors = {
        0: 'grey',
        1: 'green',
        2: 'red',
        3: 'blue'
    }

    function _color(row, col, x) {
        setBoard(b => {
            const nb = [...b]
            const nr = [...b[row]]

            nr[col] = x
            nb[row] = nr

            return nb
        })
    }

    return (
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Text>Labiryth</Text>

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {
                    board.map((row, i) => (
                        <View key={i} style={{flexDirection: 'row'}}>
                            {
                                row.map((color, j) => (
                                    <Item11 key={j} color={colors[color]} onPress={_ => _color(i, j, 1)} />
                                ))
                            }
                        </View>
                    ))
                }
            </View>

            <StatusBar />
        </View>
    )
}

export default App11