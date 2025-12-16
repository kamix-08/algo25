import { StyleSheet, View } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import Tile from './Tile'

const Board = () => {
    const [state, setState] = useState([])
    const stateRef = useRef(state)

    const countElements = (arr) => {
        const counts = {}

        for (let c of arr) {
            if (c == 0) continue
            counts[c] = (counts[c] ? counts[c] : 0) + 1
        }

        for (let key of Object.keys(counts)) {
            if (counts[key] > 1) return false
        }

        return true
    }

    const validate = (b_) => {
        const b = b_ ? b_ : stateRef.current

        for (let x = 0; x < 9; x++) {
            const sy = Math.floor(x / 3)
            const sx = x - sy * 3

            if (!countElements(b.filter((_, i) => Math.floor(i / 9) == x)) ||
                !countElements(b.filter((_, i) => i % 9 == x)) ||
                !countElements(b.filter((_, i) => Math.floor(i / 27) == sy && Math.floor(i / 3) % 3 == sx)))
                    return false
        }

        return true
    }

    const generate = (b_) => {
        const b = [...b_]

        if (!validate(b))
            return false

        const id = b.indexOf(0)
        if (id == -1)
            return b

        const q = Array(9).fill(0).map((_, i) => i + 1)
        q.sort((a, b) => Math.random() - 0.5)

        for (let v of q) {
            b[id] = v
            const r = generate(b)
            if (r)
                return r
        }

        return false
    }

    const init = () => {
        const b = generate(Array(81).fill(0))
        setState(b)
    }

    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        stateRef.current = state
    }, [state])

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