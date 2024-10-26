import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import HomeScreen from '../Screens/HomeScreen'
import ProfileScreen from '../Screens/ProfileScreen'
const Stack = createNativeStackNavigator()
function AppStack  ()  {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" component={HomeScreen} >
        <Stack.Screen 
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
          headerBackTitleVisible: false,
          headerTitle: 'Users List',
        }}
        />
         <Stack.Screen 
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
          headerBackTitleVisible: false,
          headerTitle: '',
        }}
        />
            
       
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default AppStack
