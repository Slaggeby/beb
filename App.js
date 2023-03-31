import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignUp from './screens/Signup';
import Chat from './screens/Chat';

const Stack = createStackNavigator();

function ChatStack(){
  return(
      <Stack.Navigator>
        <Stack.Screen name = "SignUp" component = {SignUp}/>
      </Stack.Navigator>


  ) 
}

function RootNavigator(){
  return(
  <NavigationContainer>{
    <Chat/>}
    
    
   
  </NavigationContainer>
  );
}


export default function App() {
  return <RootNavigator/>
      
       
       
   


  
};