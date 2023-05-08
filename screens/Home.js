import React, {useEffect,useState} from "react";
import { FlatList, StyleSheet, View, TextInput, Text, Image, SafeAreaView, TouchableOpacity,  ScrollView, Animated} from "react-native"
import { getAuth,} from 'firebase/auth';
import { collection,  getDocs,query, where, onSnapshot, } from '@firebase/firestore';
import {database, auth, } from '../config/firebase';
import addToGroceryList from "../components/addToGroceryList.js";
import styles from '../styles/HomeStyles.js';

const listIcon=require('../assets/list.png')
const homeIcon=require('../assets/home.png')
const searchIcon=require('../assets/search.png')
const accountIcon=require('../assets/account.png')
const backImage = require("../assets/bebLogo.png")
const willysLogo =require("../assets/Willys-logotyp.png")
const icaLogo =require("../assets/ICA-logotyp.png")
const coopLogo =require("../assets/coop-logotyp.png")
const moreICA =require("../assets/moreICA.png")

export default function Home({navigation}){
  const user = auth.currentUser;
  console.log('homeuser!!!',user.uid)
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
        <TouchableOpacity onPress ={()=>toggleShowAllProductsFunction()}>
          <Image source={moreICA} style ={styles.iconImage} />
        </TouchableOpacity>    
      )}
    else {
      return(
        <TouchableOpacity onPress ={()=>toggleShowAllProductsFunction()} style={{paddingBottom:8}}>
          <Image source={moreICA} style ={styles.iconImage} />        
        </TouchableOpacity>
      )}
  }

  

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(database, "products"));
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setImportedDb(newData);
    } 
    catch (error) {
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
        )}
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
      else if(item.butik === "willys" && item.onsale) {
        return <View style = {styles.itemCointainerWILLYS}>
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
        <View>
        <Image source={backImage} style={styles.bebLogo} />
        </View>
        <View style= {{ }}>
          <Text style = {styles.title}>Store Offers</Text>
        </View> 

        <ScrollView style= {{flexGrow: 1, }} contentContainerStyle={styles.scrollViewContent}>
          {/* ICA */}
          <View style={{flex:1,borderRadius: 35,
            borderColor:"rgba(232,23,0,255)", 
            borderWidth:0,marginTop:10,backgroundColor:"#F9EFEB"}}>
            <Image source={icaLogo} style ={styles.grocerImage} />
              {importedDb.map((item, index) => {
                if (item.butik === "ICA"  ){
                  if (showAllProducts ){
                    return (
                      <View key={item.id}>
                        {renderProduct(item)}
                      </View>
                      );
                    }}
                  else if (index === 0 && !showAllProducts && !firstProductRenderedICA){
                    const firstItem = importedDb.find((item) => item.butik === "ICA" );
                    return (   
                      <View  key={item.id}>
                          { renderProduct(firstItem) }
                      </View>   
                    )}
              })}

                <View style={{ flexWrap: 'wrap', alignItems: 'flex-start', alignContent:"center", paddingBottom:8 }}>
                  <ToggleShowProductButtonFunction/>
                </View>
            </View>
            
            {/* COOP */}
            <View style={{
              flex:1,borderRadius: 35,
              borderColor:"#00AA46", 
              borderWidth:0,marginTop:10,
              backgroundColor:"#CCFFCC",
               margin:10}}>

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

            {/* WIllys */}
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
          <Image source={homeIcon} style ={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigation.navigate("Search")}>
          <Image source={searchIcon} style ={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigation.navigate("Grocery")}>
          <Image source={listIcon} style ={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigation.navigate("Account")}>
          <Image source={accountIcon} style ={styles.iconImage} />
          </TouchableOpacity>
        </View>
    </View>

   )
}
