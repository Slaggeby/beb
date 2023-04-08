import React, {useState} from "react";
import {StyleSheet, View, TextInput, Button, Text, Image, SafeAreaView, TouchableOpacity, StatusBar} from "react-native"


export default function Home({navigation}){
    const [isActive, setIsActive] = useState(false)
   
   return(
    <View style={styles.container}>
        <View style= {{flex:1 }}>
            <Text style = {styles.title}>Weekly Offers</Text>
        </View>
        {/* ICA VIEWN */}
        <View style={{ flex: 1,backgroundColor: 'red', margin:10,}}>

        </View >
        {/* COOP VIEWN */}
        <View style ={{ flex: 1,backgroundColor: 'green', borderWidth: 5, borderTopLeftRadius: 20, borderTopRightRadius: 20,margin: 10}}>

        </View>
        {/* Willys VIEWN */}
        <View style = {{ flex: 1,backgroundColor: 'black', borderWidth: 5, borderTopLeftRadius: 20, borderTopRightRadius: 20, margin:10}}>

        </View>
        
    
    </View>

   )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      

      
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
      width: "100%",
      height: 140,
      position: "absolute",
      top: 0,
      resizeMode: 'cover',
      width:100,
      height:100,
      borderRadius:100/2,
      
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