import React, {useState} from "react";

import {StyleSheet, View, TextInput, Button, Text, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert} from "react-native"
const backImage = require("../assets/bebLogo.png");

import { database, auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc,setDoc, getDocs, doc } from '@firebase/firestore';






export default function Signup({navigation}){
   
 
  const [email1, setEmail1] = useState('');
  const [email2, setEmail2] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [user, setUser] = useState("");
  const [name, setName] =useState("")

  const onHandleSignup = async() => {
    if (email1 === email2 && email1 !== '' && password1 === password2 && password1 !== '' && name!=='') {
      try {
        await createUserWithEmailAndPassword(auth, email1, password1);
        const userCreds = await signInWithEmailAndPassword(auth, email1, password1);
        const user = userCreds.user;
        await setUser(user);
        console.log("user", user.uid);
        await setDoc(doc(database, "users", user.uid), 
        { name: name,
          email: user.email  
      });
        navigation.navigate("Home");
      } catch (err) {
        Alert.alert("Login error", err.message);
      }
    } else {
      Alert.alert("Login Error", "Invalid Email or Password"); 
      console.log("singup failed");
    }
  };

    return(
      


    <View style={styles.container}>
      


      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="name"
        autoFocus={true}
        value={name}
        onChangeText={(text) => setName(text)}
      />



      <TextInput
        style={styles.input}
        placeholder="Enter email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={true}
        value={email1}
        onChangeText={(text) => setEmail1(text)}
      />

<TextInput
        style={styles.input}
        placeholder="Re-enter email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={true}
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
      
      <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
        <Text style={{fontWeight: 'bold', color: '#FFFFFF', fontSize: 18}}> Create Account</Text>
      </TouchableOpacity>
      <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
        <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{color: '#E7141F', fontWeight: '600', fontSize: 14}}> Log In</Text>
        </TouchableOpacity>
      </View>
      
        </SafeAreaView>
        {/* <TextInput placeholder ="name" onChangeText={(text) => SetName(text)}/>
        <Button title="signup" onPress={()=> console.log(name)}></Button> */}
        <StatusBar barStyle="light-content" />
    </View>

);}

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
      paddingBottom: 24
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
      height: 58,

      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
  });