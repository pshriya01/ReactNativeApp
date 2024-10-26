import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ErrorBoundary = () => {
  return (
   <View style={[styles.errorContainer]} >
    <Text>Oops..Some Error Occured!</Text>
   </View>
  )
}

const styles = StyleSheet.create({
    errorContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default ErrorBoundary
