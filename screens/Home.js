import React, {useEffect,useState, useRef} from "react";
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
const moreCOOP =require("../assets/moreCOOP.png")
const moreWillys =require("../assets/moreWillys.png")

export default function Home({navigation}){
  const user = auth.currentUser;
  // console.log('homeuser!!!',user.uid)
  const [importedDb, setImportedDb] = useState([]);
  const [showAllCOOPProducts, setShowAllCOOPProducts] = useState(false);
  const [showAllICAProducts, setShowAllICAProducts] = useState(false);
  const [showAllWILLYSProducts, setShowAllWILLYSProducts] = useState(false);
  const [firstProductRenderedICA, setfirstProductRenderedICA] = useState(false)
  const [firstProductRenderedCOOP, setfirstProductRenderedCOOP] = useState(false)
  const [firstProductRenderedWILLYS, setfirstProductRenderedWILLYS] = useState(false)
  const rotateValueICA = useRef(new Animated.Value(0)).current;
  const rotateValueCOOP = useRef(new Animated.Value(0)).current;
  const rotateValueWILLYS = useRef(new Animated.Value(0)).current;
  const rotateInterpolateICA = rotateValueICA.interpolate({
    inputRange: [0, 1], 
    outputRange: ['0deg', '-180deg'],
  });
  const rotateInterpolateCOOP = rotateValueCOOP.interpolate({
    inputRange: [0, 1], 
    outputRange: ['0deg', '-180deg'],
  });
  const rotateInterpolateWILLYS = rotateValueWILLYS.interpolate({
    inputRange: [0, 1], 
    outputRange: ['0deg', '-180deg'],
  });

  const ShowAllCOOPProductsFunction = () =>{
    setShowAllCOOPProducts (!showAllCOOPProducts)
    setfirstProductRenderedCOOP((current) => !current);
    Animated.timing(rotateValueCOOP, {
      toValue: !showAllCOOPProducts ? 1 : 0, // Update rotateValue based on showAllCoopProducts state
      duration: 300,
      useNativeDriver: true,
    }).start();


  }

  const ShowCOOPProduct = () =>{
     
      return (
        <TouchableOpacity onPress ={()=>ShowAllCOOPProductsFunction()}>
          <Animated.Image source={moreCOOP} style ={[styles.iconImage,{transform: [{ rotate: rotateInterpolateCOOP }],}] } />
        </TouchableOpacity>    
      )
    
  }

  const ShowAllICAProductsFunction = () =>{
    setShowAllICAProducts (!showAllICAProducts)
    setfirstProductRenderedICA((current) => !current);
    Animated.timing(rotateValueICA, {
      toValue: !showAllICAProducts ? 1 : 0, // Update rotateValue based on showAllCoopProducts state
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  const ShowICAProduct = () =>{
      return (
        <TouchableOpacity onPress ={()=>ShowAllICAProductsFunction()}>
          <Animated.Image source={moreICA} style ={[styles.iconImage,{transform: [{ rotate: rotateInterpolateICA }],}] } />
        </TouchableOpacity>    
      )
    
  }

  const ShowAllWILLYSProductsFunction = () =>{
    setShowAllWILLYSProducts (!showAllWILLYSProducts)
    setfirstProductRenderedWILLYS((current) => !current);
    Animated.timing(rotateValueWILLYS, {
      toValue: !showAllWILLYSProducts ? 1 : 0, // Update rotateValue based on showAllCoopProducts state
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  const ShowWILLYSProduct = () =>{
    
      return (
        <TouchableOpacity onPress ={()=>ShowAllWILLYSProductsFunction()}>
          <Animated.Image source={moreWillys} style ={[styles.iconImage,{transform: [{ rotate: rotateInterpolateWILLYS }],}] }/>
        </TouchableOpacity>    
      )
    
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
        <View>
          <View style={styles.itemCointainerCOOP}>
            <Text style={styles.itemTitle}> {item.titel} </Text>
            <Text style={styles.productSubtext}> {item.leverantör} </Text>
            <Text style={styles.productSubtext}> {item.pristext} </Text>
            <Text style={styles.productSubtext}> {item.jmfpris} kr/kg </Text>
            <Image source={{uri:item.bildurl}} style={styles.productImage}/>
            <TouchableOpacity onPress={()=>addToGroceryList(item)} style={styles.button}>
              <Text style={styles.buttonText}>Add to grocerylist</Text>
            </TouchableOpacity>
          </View>
        </View>
        )}

      else if (item.butik ==="ICA" && item.onsale){
        return (
        <View  style = {styles.itemCointainerICA} >
          <View>
            <View>
              <Text style={styles.itemTitle}>{item.titel}</Text>
              <Text style={styles.productSubtext}>{item.leverantör}</Text>
              <Text style={styles.productSubtext}>{item.pristext}</Text>
              <Text style={styles.productSubtext}>{item.jmfpris} kr/kg</Text>
              <Image source={{uri:item.bildurl}} style={styles.productImage} />
              <TouchableOpacity onPress={()=>addToGroceryList(item)} style={styles.button}>
                <Text style={styles.buttonText}>Add to grocerylist</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      
      else if(item.butik === "willys" && item.onsale) {
        return (
        <View>
          <View style={styles.itemCointainerWILLYS}>
            <Text style={styles.itemTitle}>{item.titel}</Text>
            <Text style={styles.productSubtext}>{item.leverantör}</Text>
            <Text style={styles.productSubtext}>{item.pristext} </Text>
            <Text style={styles.productSubtext}>{item.jmfpris} kr/kg </Text>
            <Image source={{uri:item.bildurl}} style={styles.productImage}  />
            <TouchableOpacity onPress={()=>addToGroceryList(item)} style={styles.button}>
              <Text style={styles.buttonText}>Add to grocerylist</Text>
            </TouchableOpacity>
          </View>
      </View>
      )}
  }

  useEffect(() => {
    fetchProducts();
      }, []);

  // useEffect(() => {
  //   console.log('useEffect ran. firstProductRendered is: ', firstProductRenderedICA);
  //     }, [firstProductRenderedICA])

  // useEffect(() => {
  //   console.log('useEffect ran. showAllProducts is: ', showAllICAProducts);
  //     }, [showAllICAProducts])
    
    
   return(
    <View style={styles.container}>
      <View>
        <Image source={backImage} style={styles.bebLogo} />
      </View>
      <View style= {{ }}>
        <Text style = {styles.title}>Store Offers</Text>
      </View> 

      <ScrollView style= {{flexGrow: 1, marginBottom:50}} >

          {/* ICA */} 
        <View style={styles.cointainerICA}>
          <Image source={icaLogo} style ={styles.grocerImage} />
            {importedDb.map((item, index) => {
              if (item.butik === "ICA"  ){
                if (showAllICAProducts ){
                  return (
                    <View key={item.id}>
                      {renderProduct(item)}
                    </View>);
                    }}
              else if (index === 0 && !showAllICAProducts && !firstProductRenderedICA ){
                const firstItem = importedDb.find((item) => item.butik === "ICA" );
                  return (   
                    <View  key={item.id}>
                      { renderProduct(firstItem) }
                    </View>   
                    )}
              })}
            <View style={{ flexWrap: 'wrap', alignItems: 'flex-start', alignContent:"center", paddingBottom:8 }}>
              <ShowICAProduct/>
            </View>
        </View>
            
            {/* COOP */}
        <View style={styles.cointainerCOOP}>
          <Image source={coopLogo} style ={styles.grocerImage} />
            {importedDb.map((item, index) => {
              if (item.butik === "COOP"  ){
                if (showAllCOOPProducts){
                  return (
                    <View key={item.id}>
                      {renderProduct(item)}
                    </View>);
                  }}
              else if (index === 1 && !showAllCOOPProducts && !firstProductRenderedCOOP){
                const firstItem = importedDb.find((item) => item.butik === "COOP" );
                  return (   
                    <View  key={item.id}>
                      { renderProduct(firstItem) }
                    </View>   
                  )}
            })}
          <View style={{ flexWrap: 'wrap', alignItems: 'flex-start', alignContent:"center", paddingBottom:8 }}>
            <ShowCOOPProduct/>
          </View>
        </View>


            {/* WIllys */}
        <View style={styles.cointainerWILLYS}>
          <Image source={willysLogo} style ={styles.grocerImage} />
            {importedDb.map((item, index) => {
              if (item.butik === "willys"  ){
                if (showAllWILLYSProducts){
                  return (
                    <View key={item.id}>
                      {renderProduct(item)}
                    </View>);
                  }}
              else if (index === 2 && !showAllWILLYSProducts && !firstProductRenderedWILLYS){
                const firstItem = importedDb.find((item) => item.butik === "willys" );
                  return (   
                    <View  key={item.id}>
                      { renderProduct(firstItem) }
                    </View>   
                  )}
            })}
          <View style={{ flexWrap: 'wrap', alignItems: 'flex-start', alignContent:"center", paddingBottom:8 }}>
            <ShowWILLYSProduct/>
          </View>
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
