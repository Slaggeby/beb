import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useState, createContext, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import { registerRootComponent } from 'expo';
import Signup from './screens/Signup';
import Chat from './screens/Chat';
import Login from './screens/Login';
import Account from './screens/Account';
import Home from './screens/Home';

const Stack = createStackNavigator();

function BebStack(){
  return(
      <Stack.Navigator>
        <Stack.Screen name = "Login" component = {Login}/>
        <Stack.Screen name = "Signup" component = {Signup}/>
        <Stack.Screen name = "Account" component = {Account}/>
        <Stack.Screen name = "Home" component = {Home} />
      </Stack.Navigator>


  ) 
}



function RootNavigator(){
  // const [isLoading, setIsLoading] = useState(true);

  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size='large' />
  //       <Text>loading bruh</Text>
  //     </View>
  //   );
  // }

  return(
  <NavigationContainer>{
    <BebStack/>}
    
    
   
  </NavigationContainer>
  
  );
  
}


export default function App() {
  return <RootNavigator/>

};