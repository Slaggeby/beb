import React, {useState, useEffect} from "react";


import {StyleSheet, View, TextInput, Button, Text, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert, Keyboard} from "react-native"
const backImage = require("../assets/bebLogo.png");
import styles from '../styles/signupStyles.js';
import createNewGroceryList from "../components/createNewGroceryList.js";

import { database, auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc,setDoc, getDocs, doc } from '@firebase/firestore';






export default function Signup({navigation}){
   
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
  
    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow');
      Keyboard.removeListener('keyboardDidHide');
    };
  }, []);
  





  const [email1, setEmail1] = useState('');
  const [email2, setEmail2] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [user, setUser] = useState("");
  const [name, setName] =useState("")

  const onHandleSignup = async () => {
    if (email1 === email2 && email1 !== '' && password1 === password2 && password1 !== '' && name !== '') {
      try {
        await createUserWithEmailAndPassword(auth, email1, password1);
        const userCreds = await signInWithEmailAndPassword(auth, email1, password1);
        const user = userCreds.user;
        
        await setUser(user);
  
        const userRef = doc(database, "users", user.uid);
        await setDoc(userRef, {
          name: name,
          email: user.email
        }
        );
        createNewGroceryList('');

        // const grocerylistRef = collection(userRef, "grocerylist");
        // await setDoc(doc(grocerylistRef), {
          
        // });
  
        navigation.navigate("Home");
      } catch (err) {
        Alert.alert("Login error", err.message);
      }
    } else {
      Alert.alert("Login Error", "Invalid Email or Password");
      console.log("signup failed");
    }
  };

    return(
      


    <View style={styles.container}>
      
      {!keyboardVisible && <Image style={styles.backImage} source={require("../assets/bebLogo.png")} />}

              

              

              <View style={styles.form}>

                    {!keyboardVisible && <Text style={styles.title}>Create Account</Text>}
                    <TextInput
                      style={ !keyboardVisible ? styles.input :styles.inputNot}
                      placeholder="Enter name"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      textContentType="name"
                      
                      value={name}
                      onChangeText={(text) => setName(text)}
                    />


                    <TextInput
                      style={styles.input}
                      placeholder="Enter email"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      textContentType="emailAddress"
                      
                      value={email1}
                      onChangeText={(text) => setEmail1(text)}
                    />

                    <TextInput
                            style={styles.input}
                            placeholder="Re-enter email"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            textContentType="emailAddress"
                            
                            value={email2}
                            onChangeText={(text) => setEmail2(text)}
                          />

      <TextInput
        style={styles.input}
        placeholder="Enter password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        value={password1}
        onChangeText={(text) => setPassword1(text)}
      />

                    <TextInput
                            style={styles.input}
                            placeholder="Enter password"
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={true}
                            textContentType="password"
                            value={password2}
                            onChangeText={(text) => setPassword2(text)}
                          />
                    
                    <TouchableOpacity style={styles.button} onPress={() =>onHandleSignup()}>
                      <Text style={{fontWeight: 'bold', color: '#FFFFFF', fontSize: 18}}> Create Account</Text>
                    </TouchableOpacity>
                    <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                      <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Already have an account? </Text>
                      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={{color: '#E7141F', fontWeight: '600', fontSize: 14}}> Log In</Text>
                      </TouchableOpacity>
                    </View>
              
                </View>
                {/* <TextInput placeholder ="name" onChangeText={(text) => SetName(text)}/>
                <Button title="signup" onPress={()=> console.log(name)}></Button> */}
                <StatusBar barStyle="light-content" />
    </View>

);}

