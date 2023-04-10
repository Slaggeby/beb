import React, {useState} from "react";
import {StyleSheet, View, TextInput, Button, Text, Image, SafeAreaView, TouchableOpacity, StatusBar, ScrollView} from "react-native"
const backImage = require("../assets/backImage.png");


export default function Home({navigation}){
    const [isActive, setIsActive] = useState(false)
   
   return(
    <View style={styles.container}>
        
        <View style= {{flex:1 }}>
            <Text style = {styles.title}>Weekly Offers</Text>
        </View>
        {/* ICA VIEWN */}
        <View style={{ flex: 1,backgroundColor: 'white', margin:10, borderColor:"red", borderTopWidth:10, borderLeftWidth:8, borderRightWidth:8,}}>
        <Image source={backImage} style={styles.backImage} />
        
        <Text style={{ fontWeight:"bold",marginTop:10, left:150, fontSize:20}}>Apelsinjuice</Text>
        <Text style={{ left:150, fontSize:15}}>God Morgon</Text>
        <Text style={{ fontWeight:"bold", left:150,fontSize:15}}>2 för 35kr</Text>
        <Text style={{ left:150}}>17:50kr/liter</Text>
        {/* Ska bli ICA bilden */}
        <Image source={backImage} style ={styles.grocerImage} />
       
    
        </View >
        {/* COOP VIEWN */}
        <View style ={{ flex: 1,backgroundColor: 'white', margin:10, borderColor:"green", borderTopWidth:10, borderLeftWidth:8, borderRightWidth:8,}}>
        <Image source={backImage} style={styles.backImage} />
        <Text style={{ fontWeight:"bold",marginTop:10, left:150, fontSize:20}}>Bregott</Text>
        <Text style={{ left:150, fontSize:15}}>Arla</Text>
        <Text style={{ fontWeight:"bold", left:150,fontSize:15}}>500kr</Text>
        <Text style={{ left:150}}>1000kr/kg</Text>
        {/* Ska bli COOP bilden */}
        <Image source={backImage} style ={styles.grocerImage} />


        </View>
        {/* Willys VIEWN */}
        <View style = {{ flex: 1,backgroundColor: 'white', margin:10, borderColor:"black", borderTopWidth:10, borderLeftWidth:8, borderRightWidth:8,}}>
        <Image source={backImage} style={styles.backImage} />
        
        <Text style={{ fontWeight:"bold",marginTop:10, left:150, fontSize:20}}>Paprika</Text>
        <Text style={{ left:150, fontSize:15}}>Eldorado</Text>
        <Text style={{ fontWeight:"bold", left:150,fontSize:15}}>2 för mycket</Text>
        <Text style={{ left:150}}>dyr kr/liter</Text>
        {/* Ska bli Willys bilden */}
        <Image source={backImage} style ={styles.grocerImage} />
        </View>
        
        
    </View>

   )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"grey"
      

      
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: "orange",
      marginLeft:10,
      marginTop:10,
      
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
      position: "absolute",
      top: 15,
      left:15,
      resizeMode: 'cover',
      width:100,
      height:100,
      
      
    },
    grocerImage:{
        position: "absolute",
      top: 5,
      right:0,
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
  });