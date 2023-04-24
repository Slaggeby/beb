import React, {useEffect,useState} from "react";
import { FlatList, StyleSheet, View, TextInput, Button, Text, Image, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, Pressable} from "react-native"

import { collection, addDoc, getDocs } from '@firebase/firestore';
import {database, auth, signOut} from '../config/firebase';


export default function Home({navigation}){



return(

    




    <View style={styles.container}>

<Text>yo</Text>
















<View style ={styles.footerbuttonContainer}>
          <TouchableOpacity  onPress={() => navigation.navigate("Home")}>
          <Text style={styles.footerbutton}>⌂</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigation.navigate("Account")}>
          <Text style={styles.footerbutton}>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigation.navigate("Grocery")}>
          <Text style={styles.footerbutton}>grocery list</Text>
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