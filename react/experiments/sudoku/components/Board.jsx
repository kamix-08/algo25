import { StyleSheet, View } from 'react-native'
import { useEffect, useState } from 'react'
import Tile from './Tile'

const Board = () => {
    const [state, setState] = useState([])

    const init = () => {
        setState(Array(81).fill(0).map(_ => Math.floor(Math.random() * 10)))
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <View style={styles.board}>
            {
                Array(9).fill(0).map((_, y) => (
                    <View key={y} style={styles.row}>
                        {
                            Array(9).fill(0).map((_, x) => (
                                <Tile key={x} x={x} y={y} state={state} setState={setState} />
                            ))
                        }
                    </View>
                ))
            }
        </View>
    )
}

export default Board

const styles = StyleSheet.create({
    board: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        borderTopWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        gap: 0,
        boxSizing: 'border-box',
        flexShrink: 1,
    },
    row: {
        flexDirection: 'row',
        flexShrink: 1,
        gap: 0,
        boxSizing: 'border-box'
    }
})