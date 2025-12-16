import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React from 'react'

const Tile = ({ x, y, state, setState }) => {
    const scheme = useColorScheme()
    const id = y * 9 + x

    const callback = (v) => {
        setState(s => {
            const ns = [...s]
            ns[id] = v
            return ns
        })
    }

    const onPress = () => {
        console.log(`${x} ${y}`)
    }

    return (
        <TouchableOpacity onPress={onPress} style={{...styles.tile, borderColor: scheme == 'dark' ? 'white' : 'black'}}>
            <Text style={{...styles.option, color: scheme == 'dark' ? 'white' : 'black'}}>{state[id] == 0 ? '' : state[id]}</Text>
        </TouchableOpacity>
    )
}

export default Tile

const styles = StyleSheet.create({
    tile: {
        flex: 1,
        padding: '5px',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        flexBasis: 0,
        aspectRatio: 1,
        boxSizing: 'border-box',
        borderWidth: 1,
        borderStyle: 'solid',
        margin: 0
    },
    option: {
        textAlign: 'center',
        fontSize: 16,
    }
})