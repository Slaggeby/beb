import React, { useState, useEffect } from 'react';
import {SafeAreaView,Text, StyleSheet,View,FlatList,TextInput, Image,TouchableOpacity, TouchableOpacityComponent} from 'react-native';
import styles from '../styles/searchStyles.js';
import { collection, addDoc, getDocs,setDoc, doc, getDoc } from '@firebase/firestore';
import {database, auth} from '../config/firebase';
import addToGroceryList from "../components/addToGroceryList.js";

const backImage = require("../assets/bebLogo.png");
const willysLogo =require("../assets/Willys-logotyp.png")
const icaLogo =require("../assets/ICA-logotyp.png")
const coopLogo =require("../assets/coop-logotyp.png")
const listIcon=require('../assets/list.png')
const homeIcon=require('../assets/home.png')
const searchIcon=require('../assets/search.png')
const accountIcon=require('../assets/account.png')

export default function Search({navigation}) {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [JSONLIST, setJSONLIST] = useState('');
    const [importedDb, setImportedDb] = useState([]);
    
   
    const [showCOOP, setShowCOOP] = useState(true)
    const [showICA, setShowICA] = useState(true)
    const [showWILLYS, setShowWILLYS] = useState(true)
    const [showOnSale, setShowOnSale] = useState(true)


    const sortCOOP = () =>{ 
      setShowCOOP(!showCOOP);
      console.log("showCOOP", showCOOP)
    };
    const sortICA = () =>{ 
      setShowICA(!showICA);
    };
    const sortWILLYS = () =>{ 
      setShowWILLYS(!showWILLYS);
    };

    const sortOnSale = () => {
      setShowOnSale(!showOnSale)
      console.log("showOnSale: ",showOnSale)
    }

  const fetchProducts = async () => {
    try {
          const querySnapshot = await getDocs(collection(database, "products"));
          const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
         
          setImportedDb(newData);

          let DataList = [];
          mappedData= newData.map((item) => {
            
             DataList.push(item)
          })
     
        setJSONLIST(JSON.stringify(DataList));  
      } 
      catch (error) {
        console.error("Error fetching products:", error);
        throw error;
        }
  };

      useEffect(() => {
        fetchProducts();
      }, []);


      useEffect(() => {
        if (JSONLIST !==""){
          const responseJson = JSON.parse(JSONLIST);
          setFilteredDataSource(responseJson);
          setMasterDataSource(responseJson);
          //console.log(responseJson)
        }
        
      }, [JSONLIST])
      const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
          // Inserted text is not blank
          // Filter the masterDataSource
          // Update FilteredDataSource
          const newData = masterDataSource.filter(
            
            function (item) {
             
              const itemData = item.titel
                ? item.titel.toUpperCase()
                : ''.toUpperCase();
              const textData = text.toUpperCase();
              const isCOOP = showCOOP && item.butik === "COOP";
              const isICA = showICA && item.butik === "ICA";
              const isWILLYS = showWILLYS && item.butik === "willys";
              console.log("showOnSale in filter",showOnSale)
              console.log("onsale", item.onsale)
              const isSale = showOnSale && item.onsale

              return (
                itemData.indexOf(textData) > -1 && (isCOOP || isICA || isWILLYS ||isSale )
              );




          });
          setFilteredDataSource(newData);
          //console.log(newData)
          setSearch(text);
        } else {
          // Inserted text is blank
          // Update FilteredDataSource with masterDataSource
          setFilteredDataSource(masterDataSource);
          
          setSearch(text);
        }
      };
      
    
        const renderItems= ({item})=>{

          if (item.butik ==="COOP" && showCOOP  ){
          return(
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
            <Image source={coopLogo} style ={styles.grocerImage} />
          </View>
           
            )
          
          }
          else if(item.butik ==="ICA"  && showICA){
            return(
              <View>
                <View style = {styles.itemCointainerICA} >
                  <Text style={styles.itemTitle}>{item.titel}</Text>
                  <Text style={styles.productSubtext}>{item.leverantör}</Text>
                  <Text style={styles.productSubtext}>{item.pristext}</Text>
                  <Text style={styles.productSubtext}>{item.jmfpris} kr/kg</Text>
                  <Image source={{uri:item.bildurl}} style={styles.productImage} />
                  <TouchableOpacity onPress={()=>addToGroceryList(item)} style={styles.button}>
                    <Text style={styles.buttonText}>Add to grocerylist</Text>
                  </TouchableOpacity>
                </View>
                <Image source={icaLogo} style ={styles.grocerImage} />
              </View>
              
              
            )
          }
          else if(item.butik ==="willys"  && showWILLYS) {
            return( 
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
                <Image source={willysLogo} style ={styles.grocerImage} />
              </View>
              
            )
          }
                
                
        }

      const ItemSeparatorView = () => {
        return (
          // Flat List Item Separator
          <View
            style={{
              height: 5,
              width: '100%',
              backgroundColor: 'white',
            }}
          />
        );
      };

return(
  <View style={styles.container}>
    <View>
      <Image source={backImage} style={styles.bebLogo} />
    </View>
    
    <View>
      <Text style = {styles.title}>Search</Text>
    </View>

    <View>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={(text) => searchFilterFunction(text)}
        value={search}
        underlineColorAndroid="transparent"
        placeholder="Search Here"
      />
        
      <View style={{justifyContent:"center", flexDirection:"row"}}>
        <Text style={{paddingRight:10}}>Filter:</Text>

        <View style={{height: 20, flexDirection: 'row'}}>
          <Image source={coopLogo} style ={{resizeMode: 'contain', height:26, width:40}} />
          <View style={{justifyContent:'center', paddingRight:20}}> 
            <TouchableOpacity onPress={()=>sortCOOP()} style={{backgroundColor:"white", width:20, height:20, left:8, borderColor:"black", borderWidth: 1, borderRadius: 10}}>
              <Text style={{color:"black", left:0.5}}> {showCOOP ? '✓' : ' '} </Text>
            </TouchableOpacity>
          </View>
          
        </View>

        <View style={{height: 20, flexDirection: 'row'}}>
        <Image source={icaLogo} style ={{resizeMode: 'contain', height:20, width:40}} />
          <View style={{justifyContent:'center', paddingRight:20}}> 
            <TouchableOpacity onPress={()=>sortICA()} style={{backgroundColor:"white", width:20, height:20, left:8, borderColor:"black", borderWidth: 1, borderRadius: 10}}>
              <Text style={{color:"black", left:0.5}}> {showICA ? '✓' : ' '} </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{height: 20, flexDirection: 'row'}}>
        <Image source={willysLogo} style ={{resizeMode: 'contain', height:50, width:50, bottom:15}} />
          <View style={{justifyContent:'center', paddingRight:20}}> 
            <TouchableOpacity onPress={()=>sortWILLYS()} style={{backgroundColor:"white", width:20, height:20, left:8, borderColor:"black", borderWidth: 1, borderRadius: 10}}>
              <Text style={{color:"black", left:0.5}}> {showWILLYS ? '✓' : ' '} </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{height: 20, flexDirection: 'row'}}>
        {/* <Image source={willysLogo} style ={{resizeMode: 'contain', height:50, width:50, bottom:15}} /> */}
        <Text>On Sale</Text>
          <View style={{justifyContent:'center', paddingRight:20}}> 
            <TouchableOpacity onPress={()=>sortOnSale()} style={{backgroundColor:"white", width:20, height:20, left:8, borderColor:"black", borderWidth: 1, borderRadius: 10}}>
              <Text style={{color:"black", left:0.5}}> {showOnSale ? '✓' : ' '} </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <FlatList style={{marginBottom:220}}
        data={filteredDataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={renderItems}
      />
    </View>

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
