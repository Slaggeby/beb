import React, {useEffect,useState} from "react";
import { FlatList, StyleSheet, View, TextInput, Text, Image, SafeAreaView, TouchableOpacity,  ScrollView, Animated} from "react-native"
import styles from '../styles/HomeStyles.js';


import { collection, addDoc, getDocs, doc, getDoc, setDoc } from '@firebase/firestore';
import {database, auth, signOut} from '../config/firebase';
import addToGroceryList from "../components/addToGroceryList.js";

const listIcon=require('../assets/list-icon.png')
const backImage = require("../assets/bebLogo.png");
const willysLogo =require("../assets/Willys-logotyp.png")
const icaLogo =require("../assets/ICA-logotyp.png")
const coopLogo =require("../assets/coop-logotyp.png")
  //#00AA46 coops gröna färg
  // rgba(232,23,0,255) ICAS


export default function Home({navigation}){

  const user = auth.currentUser;
  const [importedDb, setImportedDb] = useState([]);

  const [showAllProducts, setShowAllProducts] = useState(false);
  const [firstProductRenderedICA, setfirstProductRenderedICA] = useState(false)
  
  const [viewHeight, setViewHeight] = useState(0);
 
  





  
  const toggleShowAllProductsFunction = () =>{
  
    setShowAllProducts (!showAllProducts)
    setfirstProductRenderedICA((current) => !current);
 
  } 

  
  const ToggleShowProductButtonFunction = () =>{


    if (!showAllProducts){
      return (
        <TouchableOpacity onPress ={()=>toggleShowAllProductsFunction()} style={{alignItems:"center", borderRadius: 10,borderWidth:4,}}>
          <Text style={{justifyContent:"center", height:75,width:100,textAlign: "center", padding:10,}}>Show all products on sale</Text> 
                    
        </TouchableOpacity>
  )
    }
    else {
      return(
            <TouchableOpacity onPress ={()=>toggleShowAllProductsFunction()} style={{alignItems:"center", borderRadius: 10,borderWidth:4,}}>
                <Text style={{justifyContent:"center", height:75,width:100,textAlign: "center", alignItems:"center", padding:25,}}>Close</Text> 
                        
            </TouchableOpacity>
      )
      
    }
  }


  
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
 

  
  


  const renderProduct= (item)=>{
    if (item.butik ==="COOP" && item.onsale ){
      
      return (
          <View style = {styles.itemCointainerCOOP}>
              <Image source={{ uri: item.bildurl }} style ={styles.productImage} />
              <Text Text style={{ fontWeight:"bold",marginTop:10, left:150, fontSize:20}}> {item.titel}</Text>
              <Text style={styles.productSubtext}> {item.leverantör}</Text>
              <Text style={styles.productSubtext}>{item.pristext}</Text>
              <Text style={styles.productSubtext}>{item.jmfpris} :-/kg</Text>
             
              <View style={{left:200,}}>
              
               
                <TouchableOpacity onPress={()=>addToGroceryList(item)} style={styles.AddToGroceryListButton}>
                  <Text style={{fontSize:10, color:"white",}}>Add to Grocerylist</Text>
                </TouchableOpacity>

              </View>
              
              
            </View>
      )
      }
      else if (item.butik ==="ICA" && item.onsale){
        return <Animated.View  style = {styles.itemCointainerICA} >
                      <Image source={{ uri: item.bildurl }} style ={styles.productImage} />
                      <Text Text style={{ fontWeight:"bold",marginTop:10, left:150, fontSize:20}}> {item.titel}</Text>
                      <Text style={styles.productSubtext}> {item.leverantör}</Text>
                      <Text style={styles.productSubtext}>{item.pristext}</Text>
                      <Text style={styles.productSubtext}>{item.jmfpris} :-/kg</Text>
                      <View style={{left:200,}}>
                      
                        <TouchableOpacity onPress={()=>addToGroceryList(item)} style={styles.AddToGroceryListButton}>
                          <Text style={{fontSize:10, color:"white",}}>Add to Grocerylist</Text>
                        </TouchableOpacity>

                      </View>
                  </Animated.View>
      }
      else if(item.butik === "willys" && item.onsale) {return <View style = {styles.itemCointainerWILLYS}>
      <Image source={{ uri: item.bildurl }} style ={styles.productImage} />
      
            <Text Text style={{ fontWeight:"bold",marginTop:10, left:150, fontSize:20}}> {item.titel}</Text>
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
    
      useEffect(() => {
        console.log('useEffect ran. firstProductRendered is: ', firstProductRenderedICA);
      }, [firstProductRenderedICA])
      
      useEffect(() => {
        console.log('useEffect ran. showAllProducts is: ', showAllProducts);
      }, [showAllProducts])
    
    
   return(
    <View style={styles.container}>
      
      
        <View >
        <Image source={backImage} style={styles.bebLogo} />
        </View>
        <View style= {{ }}>
                <Text style = {styles.title}>Current Offers</Text>
            </View> 

        <ScrollView style= {{flexGrow: 1, }} contentContainerStyle={styles.scrollViewContent}>
            
              

    
            <View style={{flex:1,borderRadius: 35,
              borderColor:"rgba(232,23,0,255)", 
              borderWidth:0,marginTop:10,backgroundColor:"#F9EFEB"}}>
            <Image source={icaLogo} style ={styles.grocerImage} />
            
            
                {importedDb.map((item, index) => {
                  
                  //console.log("item", item)
                  if (item.butik === "ICA"  ){
                    
                    if (showAllProducts ){
                      return (
                        <View key={item.id}>
                          {renderProduct(item)}
                        </View>
                      );
                    }


                  }
                  else if (index === 0 && !showAllProducts && !firstProductRenderedICA){
                   
                    
                    const firstItem = importedDb.find((item) => item.butik === "ICA" );

                    
              
                    return (   
                      <View  key={item.id}>
                          { renderProduct(firstItem) }
                      </View>   )}
                
                }
               
                
                )}


                


                <View style={{ flexWrap: 'wrap', alignItems: 'flex-start', alignContent:"center" }}>
                      <ToggleShowProductButtonFunction/>
                </View>
            </View>
            
            
            <View style={{
              flex:1,borderRadius: 35,
              borderColor:"#00AA46", 
              borderWidth:0,marginTop:10,
              backgroundColor:"#CCFFCC",
               margin:10,}}>

            <Image source={coopLogo} style ={styles.grocerImage} />
            {importedDb.map((item) => {
                  if (item.butik === "COOP" ){
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
