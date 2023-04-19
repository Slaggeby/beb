import React, { useState, createContext, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
const backImage = require("../assets/bebLogo.png");


export default function Login({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      
        signInWithEmailAndPassword(auth, email, password)
        
        .catch((err) => Alert.alert("Login error", err.message));
        
        //de här kan vi fan inte ha. Lösning vi lägger till en loading animation xd xd xd xd
        setTimeout(() => {
          const user = auth.currentUser;
          if (user){ 

            console.log("Login success"),
            //Navigate homescreen
            navigation.navigate("Home")
          
          } 


        }, 1000);

      
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
      <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
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
    
     <Button
      style={{fontSize: 20, color: 'green'}}
        onPress={() => navigation.navigate("Account")}
        title="Navigate to Account">
      </Button>

      <Button
            style={{fontSize: 20, color: 'green'}}
              onPress={() => navigation.navigate("Home")}
              title="Navigate to Home">
      </Button>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "#B4131B",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#FEF5F5",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "100%",
    height: 150,
    top: 30,
    resizeMode: 'contain',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#CB131C',
    height:58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});