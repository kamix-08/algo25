import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import Item10 from './comps/Item10'

const App10 = () => {
    function rndClr() {
        return '#' + (Math.floor(Math.random() * (0xffffff - 0x100000 + 1) + 0x100000)).toString(16)
    }

    const [board, setBoard] = useState(Array(8).fill(0).map(_ => Array(Math.floor(Math.random() * 4) + 4).fill(0).map(rndClr)))

    function remove(row, column) {
        setBoard(b => {
            const nb = [...b]
            const nr = [...nb[row]].filter((_, i) => i != column)

            if (nr.length == 0)
                return nb.filter((_, i) => i != row)

            nb[row] = nr
            return nb
        })
    }

    return (
        <View style={{flex: 1, flexDirection: 'column'}}>
            {
                board.map((row, i) => (
                    <View key={i} style={{flex: 1, flexDirection: 'row'}}>
                        {
                            row.map((color, j) => (
                                <Item10 key={j} color={color} onPress={_ => remove(i, j)} />
                            ))
                        }
                    </View>
                ))
            }
        </View>
    )
}

export default App10

const styles = StyleSheet.create({})