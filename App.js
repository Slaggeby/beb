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
import Search from './screens/Search';
const Stack = createStackNavigator();

function BebStack(){
  return(
      <Stack.Navigator>
        <Stack.Screen name = "Login" component = {Login} options ={{headerShown:false}}/>
        <Stack.Screen name = "Signup" component = {Signup} options ={{headerShown:false}}/>
        <Stack.Screen name = "Account" component = {Account} options ={{headerShown:false}}/>
        <Stack.Screen name = "Home" component = {Home} options={{ title: 'My home', headerTintColor:"black", headerStyle:{ backgroundColor: '#B4131B'}, }} />
        <Stack.Screen name = "Search" component = {Search} />
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