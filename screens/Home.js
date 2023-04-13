import React, {useState} from "react";
import {StyleSheet, View, TextInput, Button, Text, Image, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, Pressable} from "react-native"
const backImage = require("../assets/backImage.png");


export default function Home({navigation}){
    const [isActive, setIsActive] = useState(false)
    const [people, setPeople]=useState([
      {name:"Anton1", key:"1"},
      {name:"Anton2", key:"2"},
      {name:"Anton3", key:"3"},
      {name:"Anton4", key:"4"},
      {name:"Anton5", key:"5"},
      {name:"Anton6", key:"6"},
      {name:"Anton7", key:"7"},
      {name:"Anton8", key:"8"},
      {name:"Anton9", key:"9"},
      {name:"Anton10", key:"10"},
      {name:"Anton11", key:"11"},
      {name:"Anton12", key:"12"},
      {name:"Anton13", key:"13"},
      {name:"Anton14", key:"14"},
    ])
   return(
    <View style={styles.container}>
        <ScrollView>
          <View style= {{flex:1 }}>
              <Text style = {styles.title}>Weekly Offers</Text>
          </View>
          {/* ICA VIEWN */}
          <View style={{ flex: 1,backgroundColor: '#FEF5F5', margin:10, borderColor:"red", borderTopWidth:12, borderLeftWidth:8, borderRightWidth:8,}}>
          <Image source={backImage} style={styles.backImage} />
          
          <Text style={{ fontWeight:"bold",marginTop:10, left:150, fontSize:20}}>Apelsinjuice</Text>
          <Text style={{ left:150, fontSize:15}}>God Morgon</Text>
          <Text style={{ fontWeight:"bold", left:150,fontSize:15}}>2 för 35kr</Text>
          <Text style={{ left:150}}>17:50kr/liter</Text>
          {/* Ska bli ICA bilden */}
          <Image source={backImage} style ={styles.grocerImage} />
        
      
          </View >
          {/* COOP VIEWN */}
          <View style ={{ flex: 1,backgroundColor: '#FEF5F5', margin:10, borderColor:"green", borderTopWidth:12, borderLeftWidth:8, borderRightWidth:8,}}>
          <Image source={backImage} style={styles.backImage} />
          <Text style={{ fontWeight:"bold",marginTop:10, left:150, fontSize:20}}>Bregott</Text>
          <Text style={{ left:150, fontSize:15}}>Arla</Text>
          <Text style={{ fontWeight:"bold", left:150,fontSize:15}}>500kr</Text>
          <Text style={{ left:150}}>1000kr/kg</Text>
          {/* Ska bli COOP bilden */}
          <Image source={backImage} style ={styles.grocerImage} />


          </View>
          {/* Willys VIEWN */}
          <View style = {{ flex: 1,backgroundColor: '#FEF5F5', margin:10, borderColor:"black", borderTopWidth:12, borderLeftWidth:8, borderRightWidth:8,}}>
          <Image source={backImage} style={styles.backImage} />
          
          <Text style={{ fontWeight:"bold",marginTop:10, left:150, fontSize:20}}>Paprika</Text>
          <Text style={{ left:150, fontSize:15}}>Eldorado</Text>
          <Text style={{ fontWeight:"bold", left:150,fontSize:15}}>2 för mycket</Text>
          <Text style={{ left:150}}>dyr kr/liter</Text>
          {/* Ska bli Willys bilden */}
          <Image source={backImage} style ={styles.grocerImage} />
          </View>
  
        <View>
          {people.map((item)=> {
            return(
              <View key={item.key}>
                <Text style={{fontSize:36}}>{item.name}</Text>
              </View>
            )
          })}
        </View>


        </ScrollView>
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
      backgroundColor:"#FFFFFF"
      

      
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: "black",
      marginLeft:10,
      marginTop:10,
      marginBottom:20,
      
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
    footerbuttonContainer:{
      position:"absolute",
      bottom:0,
      flex:0.3,
      backgroundColor:"#B4131B",
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
  });