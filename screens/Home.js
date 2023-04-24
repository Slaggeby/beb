import React, {useEffect,useState} from "react";
import { FlatList, StyleSheet, View, TextInput, Button, Text, Image, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, Pressable} from "react-native"

import { collection, addDoc, getDocs } from '@firebase/firestore';
import {database, auth, signOut} from '../config/firebase';


const backImage = require("../assets/bebLogo.png");
const willysLogo =require("../assets/Willys-logotyp.png")
const icaLogo =require("../assets/ICA-logotyp.png")
const coopLogo =require("../assets/coop-logotyp.png")


export default function Home({navigation}){

  const user = auth.currentUser;
  
  
 

  const [importedDb, setImportedDb] = useState([]);


  
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(database, "products"));
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
     
      setImportedDb(newData);
      
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };
 
  //#00AA46 coops gröna färg
  // rgba(232,23,0,255) ICAS
  const renderBorder= (item)=>{
    if (item.butik ==="COOP"){
      
      return <View style = {{ flex: 1,borderRadius: 5,borderTopRightRadius: 50, margin:10, backgroundColor:'#fafeff', borderColor:"#00AA46", borderWidth:12,}}>
        <Image source={{ uri: item.bildurl }} style ={styles.productImage} />
        <Image source={coopLogo} style ={styles.grocerImage} />
              <Text Text style={{ fontWeight:"bold",marginTop:10, left:150, fontSize:20}}> {item.id}</Text>
               
              <Text style={styles.productSubtext}> {item.leverantör}</Text>
              <Text style={styles.productSubtext}>{item.pristext}</Text>
              <Text style={styles.productSubtext}>{item.jmfpris} :-/kg</Text>
      </View>
      }
      else if (item.butik ==="ICA"){
        return <View style = {{ flex: 1, borderRadius: 5,borderTopRightRadius: 50, backgroundColor: '#fafeff', margin:10, borderColor:"rgba(232,23,0,255)", borderWidth:12,}}>
        <Image source={{ uri: item.bildurl }} style ={styles.productImage} />
        <Image source={icaLogo} style ={styles.grocerImage} />
              <Text Text style={{ fontWeight:"bold",marginTop:10, left:150, fontSize:20}}> {item.id}</Text>
               
              <Text style={styles.productSubtext}> {item.leverantör}</Text>
              <Text style={styles.productSubtext}>{item.pristext}</Text>
              <Text style={styles.productSubtext}>{item.jmfpris} :-/kg</Text>
      </View>
      }
      else {return <View style = {{ flex: 1,borderRadius: 5,borderTopRightRadius: 50, backgroundColor: '#fafeff', margin:10, borderColor:"black", borderWidth:12, }}>
      <Image source={{ uri: item.bildurl }} style ={styles.productImage} />
      <Image source={willysLogo} style ={styles.grocerImage} />
            <Text Text style={{ fontWeight:"bold",marginTop:10, left:150, fontSize:20}}> {item.id}</Text>
             
            <Text style={styles.productSubtext}> {item.leverantör}</Text>
            <Text style={styles.productSubtext}>{item.pristext}</Text>
            <Text style={styles.productSubtext}>{item.jmfpris} :-/kg</Text>
    </View>}
      
    
    }


  
      
      useEffect(() => {
        fetchProducts();
      }, []);
    
   
    const [isActive, setIsActive] = useState(false)

      
    const LogOut = () => {
      console.log("you logged out");
      
      
      }
   return(
    <View style={styles.container}>
      
      
        <View style={{}}>
        <Image source={backImage} style={styles.bebLogo} />
        </View>

        <ScrollView style= {{flex: 1}} contentContainerStyle={styles.scrollViewContent}>
          
          <View style= {{flex:1 }}>

              <Text style = {styles.title}>Weekly Offers</Text>
          </View>    

          {/* final view */}
          <View >
            {importedDb.map((item) => (
            <View  key={item.id}>
               { renderBorder(item) }
            
              
             
              
            </View>
      ))}
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
  });