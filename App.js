import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import AppStack from './src/Routes/AppStack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import store from './src/Redux/Store'

const App = () => {
  return (
    <Provider store={store}>
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, borderWidth: 1 }} >
        <AppStack />
      </SafeAreaView>
    </SafeAreaProvider>
    </Provider>

  )
}

export default App
