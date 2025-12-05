import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Item02 = (props) => {
  return (
    <View style={{
        backgroundColor: props.bg,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <Text style={{
            color: props.fg,
            fontSize: props.size
        }}>item = {props.name}</Text>
    </View>
  )
}

export default Item02

const styles = StyleSheet.create({})