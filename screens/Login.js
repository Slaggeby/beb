import React, { useState, createContext, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert, KeyboardAvoidingView, } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import styles from '../styles/LoginStyles.js';

const backImage = require("../assets/bebLogo.png");



export default function Login({ navigation }) {


  //this is the real login fields, the other ones are just for ease
  //  const [email, setEmail] = useState("");
  //  const [password, setPassword] = useState("");
  
  const email="test@test.se"
  const password="123456"
  

  const onHandleLogin = async() => {
    try {
      if (email !== "" && password !== "") {
        await signInWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        if (user){ 

          console.log("Login success"),
          //Navigate homescreen
          navigation.navigate("Home")

        } 
        
      }
    } catch (err) {
      Alert.alert("Login error", err.message);
    }
  };
  
  
  return (
    <View style={styles.container}>
      
      <Image source={backImage} style={styles.backImage} />
      
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Log In</Text>
         <TextInput
        style={styles.input}
        placeholder="Enter email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={true}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={() =>onHandleLogin()}>
        <Text style={{fontWeight: 'bold', color: '#FFFFFF', fontSize: 18}}> Log In</Text>
      </TouchableOpacity>

      <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
        <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={{color: '#E7141F', fontWeight: '600', fontSize: 14}}> Sign Up</Text>
        </TouchableOpacity>
      </View>
      
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    
     {/* <Button
      style={{fontSize: 20, color: 'green'}}
        onPress={() => navigation.navigate("Account")}
        title="Navigate to Account">
      </Button>

      <Button
            style={{fontSize: 20, color: 'green'}}
              onPress={() => navigation.navigate("Home")}
              title="Navigate to Home">
      </Button> */}

    </View>
  );
}
