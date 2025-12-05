import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Item03 = (props) => {
  return (
    <View style={{
        backgroundColor: props.color,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }}>
      <Text style={{
        fontSize: 32,
        color: props.fg
      }}>item = {props.id}</Text>
    </View>
  )
}

export default Item03

const styles = StyleSheet.create({})