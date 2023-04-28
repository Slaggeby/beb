import React, {useEffect,useState} from "react";
import { FlatList, StyleSheet, View, TextInput, Text, Image, SafeAreaView, TouchableOpacity,  ScrollView} from "react-native"

import { collection, addDoc, getDocs, doc, getDoc, setDoc } from '@firebase/firestore';
import {database, auth, signOut} from '../config/firebase';

const listIcon=require('../assets/list-icon.png')
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


  

  const removeItem = (item) =>{
    console.log(item)
  }



  const addToGroceryList = async (item) =>{
  
    const userRef = doc(database, "users", user.uid);
    const grocerylistRef = collection(userRef, "grocerylist");
    const itemDocRef=doc(grocerylistRef,item.id);
    const itemDoc = await getDoc(itemDocRef);

    if (itemDoc.exists()){ 
        console.log('it works')
        const existingAmount = itemDoc.data().amount;
        await setDoc(itemDocRef, { item: item, amount: existingAmount + 1 })
    }
    else{

    await setDoc(doc(grocerylistRef,item.id), {
      item: item,
      amount: 1
    });
}


  }


  const renderProduct= (item)=>{
    if (item.butik ==="COOP"){
      
      return <View style = {styles.itemCointainerCOOP}>
              <Image source={{ uri: item.bildurl }} style ={styles.productImage} />
              <Text Text style={{ fontWeight:"bold",marginTop:10, left:150, fontSize:20}}> {item.id}</Text>
              <Text style={styles.productSubtext}> {item.leverantör}</Text>
              <Text style={styles.productSubtext}>{item.pristext}</Text>
              <Text style={styles.productSubtext}>{item.jmfpris} :-/kg</Text>
             
              <View style={{left:200,}}>
              
               
                <TouchableOpacity onPress={()=>addToGroceryList(item)} style={styles.AddToGroceryListButton}>
                  <Text style={{fontSize:10, color:"white",}}>Add to Grocerylist</Text>
                </TouchableOpacity>

              </View>
              
              
      </View>
      }
      else if (item.butik ==="ICA"){
        return <View style = {styles.itemCointainerICA}>
        <Image source={{ uri: item.bildurl }} style ={styles.productImage} />
        
              <Text Text style={{ fontWeight:"bold",marginTop:10, left:150, fontSize:20}}> {item.id}</Text>
               
              <Text style={styles.productSubtext}> {item.leverantör}</Text>
              <Text style={styles.productSubtext}>{item.pristext}</Text>
              <Text style={styles.productSubtext}>{item.jmfpris} :-/kg</Text>

              <View style={{left:200,}}>
              
               
                <TouchableOpacity onPress={()=>addToGroceryList(item)} style={styles.AddToGroceryListButton}>
                  <Text style={{fontSize:10, color:"white",}}>Add to Grocerylist</Text>
                </TouchableOpacity>

              </View>
      </View>
      }
      else {return <View style = {styles.itemCointainerWILLYS}>
      <Image source={{ uri: item.bildurl }} style ={styles.productImage} />
      
            <Text Text style={{ fontWeight:"bold",marginTop:10, left:150, fontSize:20}}> {item.id}</Text>
            <Text style={styles.productSubtext}> {item.leverantör}</Text>
            <Text style={styles.productSubtext}>{item.pristext}</Text>
            <Text style={styles.productSubtext}>{item.jmfpris} :-/kg</Text>
            <View style={{left:200,}}>
              
               
                <TouchableOpacity onPress={()=>addToGroceryList(item)} style={styles.AddToGroceryListButton}>
                  <Text style={{fontSize:10, color:"white",}}>Add to Grocerylist</Text>
                </TouchableOpacity>

              </View>
    </View>}
      
    
    }


  
      
      useEffect(() => {
        fetchProducts();
      }, []);
    
   
    const [isActive, setIsActive] = useState(false)

      
    
   return(
    <View style={styles.container}>
      
      
        <View style={{}}>
        <Image source={backImage} style={styles.bebLogo} />
        </View>

        <ScrollView style= {{flexGrow: 1, }} contentContainerStyle={styles.scrollViewContent}>
            
            <View style= {{flex:1 }}>
                <Text style = {styles.title}>Current Offers</Text>
            </View>    

            {/* final view */}
            <View style={{flex:1,borderRadius: 35,
              borderColor:"rgba(232,23,0,255)", 
              borderWidth:0,marginTop:10,backgroundColor:"#F9EFEB"}}>
            <Image source={icaLogo} style ={styles.grocerImage} />
            
                {importedDb.map((item) => {
                  if (item.butik === "ICA"){
                    return (   
                          <View  key={item.id}>
                            
                              { renderProduct(item) }
                          </View>
                      
                    )
                  }
                })}
            </View>
            
            
            <View style={{
              flex:1,borderRadius: 35,
              borderColor:"#00AA46", 
              borderWidth:0,marginTop:10,
              backgroundColor:"#CCFFCC",
               margin:10,}}>

            <Image source={coopLogo} style ={styles.grocerImage} />
            {importedDb.map((item) => {
                  if (item.butik === "COOP"){
                    return (
                      <View  key={item.id}>
                    { renderProduct(item) }
                  </View>
                    )
                  }
                })}
            </View>

            <View style={{flex:1, borderRadius: 35,
              borderColor:"black", 
              borderWidth:0,margin:10,marginBottom:50,backgroundColor:"#cfd7e3" }}>
            <Image source={willysLogo} style ={styles.grocerImage} />
            {importedDb.map((item) => {
                  if (item.butik === "willys"){
                    return (
                      <View  key={item.id}>
                    { renderProduct(item) }
                  </View>
                    )
                  }                 
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
      backgroundColor:"white"
    },

    itemCointainerCOOP:{
      borderRadius: 5,
      borderColor:"#00AA46", 
      borderWidth:4,
      flex:1,
      backgroundColor:"white",
      padding: 10, 
      borderRadius: 35,
      margin:10,
    },

    itemCointainerICA:{
      borderRadius: 5,
      borderColor:"rgba(232,23,0,255)", 
      borderWidth:4,
      flex:1,
      backgroundColor:"white",
      padding: 10, 
      borderRadius: 35,
      margin:10,
    },

    itemCointainerWILLYS:{
      borderRadius: 5,
      borderColor:"black", 
      borderWidth:4,
      flex:1,
      backgroundColor:"#F9EFEB",
      padding: 10, 
      borderRadius: 35,
      margin:10,
    },
    productSubtext: { 
      fontWeight:"bold",
       left:150,
       fontSize:15
       
      },

    productImage:{
      position: "absolute",
    bottom:25,
    left:25,
    resizeMode: 'cover',
    width:80,
    height:80,
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
      
    top: 10,
    right:-10,
    resizeMode: 'contain',
    width:70,
    height:70,
  
  },

     iconImage:{
        
      top:2,
      width:40,
      height:40,

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

    AddToGroceryListButton: {
      backgroundColor: '#CB131C',
      height:38,
      width:100,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      left:25,
      
      
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
      width:"100%",
      

      

    },
    footerbutton:{
      color: 'black', 
      fontWeight: '600', 
      fontSize: 20,
      margin:10
      
    },
  });