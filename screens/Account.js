import React, {useState} from "react";
import {StyleSheet, View, TextInput, Button, Text, Image, SafeAreaView, TouchableOpacity, StatusBar} from "react-native"

import firebase from 'firebase/app';




const backImage = require("../assets/backImage.png");
const bebLogo = require("../assets/bebLogo.png");


export default function Account({navigation}){

  

 




  




  
  Logout=() =>{
    
    return(
      console.log("JIJAI")
    )
  }

    const [isActive, setIsActive] = useState(false)
    const changeTheme = () =>{
        setIsActive(current => !current)
        console.log("jek")
    }
   return(
    <View style={styles.container}>

      <View>
      <Image source={bebLogo} style={styles.bebLogo}/>
      </View>
      


            <View styles={{flex: 3}}>
                <Image source={backImage} style={styles.backImage} />
            </View>

        <View style = {{flex: 8, marginTop:100}}>
        

            <View styles = {styles.input}>
                <View>
                    <Text style={styles.input}>Name</Text>
                </View>

                <View>
                  <Text style = {styles.input}>Email adress</Text>
                  
                </View>

            </View>
       
        </View>
        
        <View style={{marginBottom:50,width:100,left:300,}}>
          
         <TouchableOpacity style={styles.button} onPress={Logout} >

            <Text style={{fontWeight: 'bold', color: '#FFFFFF', fontSize: 18}}> Log In</Text>
          </TouchableOpacity>
        </View>
    

        <View style ={styles.footerbuttonContainer}>
          <TouchableOpacity  onPress={() => navigation.navigate("Home")}>
          <Text style={styles.footerbutton}>⌂</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigation.navigate("Account")}>
          <Text style={styles.footerbutton}>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigation.navigate("Account")}>
          <Text style={styles.footerbutton}>%</Text>
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
      backgroundColor: "white",

      
    },
    button: {
      backgroundColor: '#CB131C',
      height:58,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
      marginBottom:140,
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: "orange",
      alignSelf: "center",
      paddingBottom: 24,
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
    backImage: {
      width: "100%",
      height: 140,
      position: "absolute",
      top: 0,
      resizeMode: 'cover',
      width:100,
      height:100,
      borderRadius:100/2,
      
    },
    bebLogo:{
      width: "100%",
      height: 50,
      top: 30,
      resizeMode: 'contain',
    
    },
    footerbuttonContainer:{
      position:"absolute",
      bottom:0,
      flex:1,
      backgroundColor:"#B4131B",
      flexDirection:"row",
      justifyContent:"space-evenly",
      width:"100%"
    },
    footerbutton:{
        color: 'black', 
        fontWeight: '600', 
        fontSize: 20,
        margin:10, 
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
    
  });