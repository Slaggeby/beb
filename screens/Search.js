import React, { useState, useEffect } from 'react';
import {SafeAreaView,Text, StyleSheet,View,FlatList,TextInput, Image,TouchableOpacity, TouchableOpacityComponent} from 'react-native';

import { collection, addDoc, getDocs,setDoc, doc } from '@firebase/firestore';
import {database, auth} from '../config/firebase';


const backImage = require("../assets/bebLogo.png");
const willysLogo =require("../assets/Willys-logotyp.png")
const icaLogo =require("../assets/ICA-logotyp.png")
const coopLogo =require("../assets/coop-logotyp.png")
const listIcon=require('../assets/list-icon.png')



export default function Search({navigation}) {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [JSONLIST, setJSONLIST] = useState('');
    const [importedDb, setImportedDb] = useState([]);
    const user = auth.currentUser;
   

    
  const addToGroceryList = async (item) =>{
  
    const userRef = doc(database, "users", user.uid);
   
    const grocerylistRef = collection(userRef, "grocerylist");
    await setDoc(doc(grocerylistRef,item.id), {
      item: item
    });

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
    
          
        

            
        } catch (error) {
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
             
              const itemData = item.id
                ? item.id.toUpperCase()
                : ''.toUpperCase();
              const textData = text.toUpperCase();
              
              return itemData.indexOf(textData) > -1;
          });
          setFilteredDataSource(newData);
          setSearch(text);
        } else {
          // Inserted text is blank
          // Update FilteredDataSource with masterDataSource
          setFilteredDataSource(masterDataSource);
          setSearch(text);
        }
      };
      
    
        const renderItems= ({item})=>{
          if (item.butik ==="COOP"){
          return(
            <View>
              <View style={styles.itemCointainerCOOP}>
              <Text style={styles.itemTitle}>
                {item.id}
              </Text>

              <Text style={styles.productSubtext}>
                {item.leverantör}
              </Text>

              <Text style={styles.productSubtext}>
                {item.pristext}
              </Text>

              <Text style={styles.productSubtext}>
                {item.jmfpris} kr/kg
              </Text>

              <Image source={{uri:item.bildurl}} style={styles.productImage}  />

           

          <TouchableOpacity onPress={()=>addToGroceryList(item)} style={styles.button}>
            <Text style={styles.buttonText}>Add to grocerylist</Text>
          </TouchableOpacity>
          </View>
               <Image source={coopLogo} style ={styles.grocerImage} />
            </View>
           
            )
          
          }
          else if(item.butik ==="ICA"){
            return(
              <View>
                    
                    <View>
                  <View style={styles.itemCointainerICA}>
                  <Text style={styles.itemTitle}>
                    {item.id}
                  </Text>

                  <Text style={styles.productSubtext}>
                    {item.leverantör}
                  </Text>

                  <Text style={styles.productSubtext}>
                    {item.pristext}
                  </Text>

                  <Text style={styles.productSubtext}>
                    {item.jmfpris} kr/kg
                  </Text>

                  <Image source={{uri:item.bildurl}} style={styles.productImage}  />

              

                  <TouchableOpacity onPress={()=>addToGroceryList(item)} style={styles.button}>
                    <Text style={styles.buttonText}>Add to grocerylist</Text>
                  </TouchableOpacity>
                    </View>
                      <Image source={icaLogo} style ={styles.grocerImage} />
                  </View>
              </View>
              
            )
          }
          else {
            return( 
              <View>
                <View style={styles.itemCointainerWILLYS}>
              <Text style={styles.itemTitle}>
                {item.id}
              </Text>

              <Text style={styles.productSubtext}>
                {item.leverantör}
              </Text>

              <Text style={styles.productSubtext}>
                {item.pristext}
              </Text>

              <Text style={styles.productSubtext}>
                {item.jmfpris} kr/kg
              </Text>

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
<SafeAreaView style={{flex: 1}}>
        <View style={{}}>
          <Image source={backImage} style={styles.bebLogo} />
        </View>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <FlatList style={{marginBottom:150}}
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={renderItems}
        />
       
      </View>
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
    </SafeAreaView>
)
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },

    footerbuttonContainer:{
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      position:"absolute",
      bottom:0,
      height:50,
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

    itemCointainerCOOP:{
      borderRadius: 5,
      borderColor:"#00AA46", 
      borderWidth:7,

      flex:1,
      backgroundColor:"#F9EFEB",
      padding: 10, 
      borderRadius: 35,
      margin:10,
    },
    itemCointainerICA:{
      borderRadius: 5,
      borderColor:"rgba(232,23,0,255)", 
      borderWidth:7,
      flex:1,
      backgroundColor:"#F9EFEB",
      padding: 10, 
      borderRadius: 35,
      margin:10,
    },
    itemCointainerWILLYS:{
      borderRadius: 5,
      borderColor:"black", 
      borderWidth:7,
      flex:1,
      backgroundColor:"#F9EFEB",
      padding: 10, 
      borderRadius: 35,
      margin:10,
    },
    itemTitle: {
      padding: 10,
      height:50,
      fontSize:20,
      top:0,
      left:25,
      
    },
    button: {
      backgroundColor: '#CB131C',
      height:38,
      width:100,
      left:260,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
      
    },
    iconImage:{
        
        top:2,
        width:40,
        height:40,
  
      },
    bebLogo: {
      
      width: "100%",
      height: 50,
      top: 10,
      resizeMode: 'contain',
      
    },
    buttonText:{
      fontWeight:"bold",
      color:"white",
    },

    productSubtext: { 
    fontWeight:"bold",
     left:150,
     fontSize:15
     
    },
    textInputStyle: {
      height: 40,
      borderWidth: 1,
      paddingLeft: 20,
      margin: 5,
      borderColor: '#009688',
      backgroundColor: '#FFFFFF',
    },
    productImage:{
      position: "absolute",
    bottom:25,
    left:25,
    resizeMode: 'cover',
    width:100,
    height:100,
  },
  grocerImage:{
    position: "absolute",
  top: 10,
  right:20,
  resizeMode: 'contain',
  width:70,
  height:70,

},
  });