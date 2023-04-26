import 'react-native-gesture-handler';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useState, createContext, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './screens/Signup';

import Login from './screens/Login';
import Account from './screens/Account';
import Home from './screens/Home';
import Search from './screens/Search';
import Grocery from './screens/Grocery';
const Stack = createStackNavigator();

function BebStack(){
  return(
      <Stack.Navigator>
        <Stack.Screen name = "Login" component = {Login} options ={{headerShown:false}}/>
        <Stack.Screen name = "Signup" component = {Signup} options ={{headerShown:false}}/>
        <Stack.Screen name = "Account" component = {Account} options ={{headerShown:false}}/>
        <Stack.Screen name = "Home" component = {Home} options={{headerShown:false}} />
        <Stack.Screen name = "Search" component = {Search} options={{headerShown:false}} />
        <Stack.Screen name = "Grocery" component = {Grocery} options={{headerShown:false}} />
      </Stack.Navigator>


  ) 
}



function RootNavigator(){
 

  return(
  <NavigationContainer>{
    <BebStack/>}
    
    
   
  </NavigationContainer>
  
  );
  
}


export default function App() {
  return <RootNavigator/>

};