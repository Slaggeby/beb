import React, {useEffect,useState} from "react";
import { FlatList, StyleSheet, View, TextInput, Button, Text, Image, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, Pressable} from "react-native"


import {database, auth, s} from '../config/firebase';
import { collection, addDoc,setDoc, getDocs, doc } from '@firebase/firestore';

const backImage = require("../assets/bebLogo.png");
const listIcon=require('../assets/list-icon.png')

export default function Home({navigation}){

  const user = auth.currentUser;

return(

    




    <View style={styles.container}>

<View style={{}}>
        <Image source={backImage} style={styles.bebLogo} />
        </View>

        <ScrollView style= {{flex: 1}} contentContainerStyle={styles.scrollViewContent}>
          
          <View style= {{flex:1 }}>

              <Text style = {styles.title}>Your Grocery List</Text>
          </View> 
        </ScrollView>














<View style ={styles.footerbuttonContainer}>
          <TouchableOpacity  onPress={() => navigation.navigate("Home")}>
          <Text style={styles.footerbutton}>⌂</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigation.navigate("Account")}>
          <Text style={styles.footerbutton}>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigation.navigate("Grocery")}>
          <Image source={listIcon} style ={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigation.navigate("Search")}>
          <Text style={styles.footerbutton}>🔍</Text>
          </TouchableOpacity>

        </View>

        </View>

)

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#F9EFEB"
        
  
        
      },
  
      scrollViewContent: {
        flexGrow: 1,
      },
  
      title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: "#D82401",
        marginLeft:10,
        marginTop:10,
        marginBottom:10,
        
      },
      productSubtext: 
      { fontWeight:"bold",
       left:150,
       fontSize:15
      },
  
  
      input: {
        backgroundColor: "#F6F7FB",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
        marginTop:25,
        
      },
      bebLogo: {
        
        width: "100%",
        height: 50,
        top: 10,
        resizeMode: 'contain',
        
      },
      grocerImage:{
          position: "absolute",
        top: 50,
        right:2,
        resizeMode: 'contain',
        width:70,
        height:70,
  
      },
      iconImage:{
        
        top:2,
        width:40,
        height:40,
  
      },
  
      productImage:{
        position: "absolute",
      top: 5,
      left:0,
      resizeMode: 'cover',
      width:70,
      height:70,
  
    },
      whiteSheet: {
        width: '100%',
        height: '75%',
        position: "absolute",
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 60,
      },
      form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30,
      },
      button: {
        backgroundColor: 'red',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        
      },
      footerbuttonContainer:{
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        position:"absolute",
        bottom:0,
        flex:0.3,
        backgroundColor:"#D82401",
        flexDirection:"row",
        justifyContent:"space-evenly",
        width:"100%"
  
        
  
      },
      footerbutton:{
        color: 'black', 
        fontWeight: '600', 
        fontSize: 20,
        margin:10
        
      },
})