import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Item06 = (props) => {
  return (
    <View style={{
        backgroundColor: props.color,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }}>
      <Text style={{
        color: 'white',
        fontSize: 32
      }}>{props.num}</Text>
    </View>
  )
}

export default Item06

const styles = StyleSheet.create({})