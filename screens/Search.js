import React, { useState, useEffect } from 'react';
import {SafeAreaView,Text, StyleSheet,View,FlatList,TextInput, Image,TouchableOpacity, TouchableOpacityComponent} from 'react-native';
import styles from '../styles/searchStyles.js';
import { collection, addDoc, getDocs,setDoc, doc, getDoc } from '@firebase/firestore';
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
   
    const [showCOOP, setShowCOOP] = useState(true)
    const [showICA, setShowICA] = useState(true)
    const [showWILLYS, setShowWILLYS] = useState(true)

    const sortCOOP = () =>{ 
      setShowCOOP(!showCOOP);
    };
    const sortICA = () =>{ 
      setShowICA(!showICA);
    };
    const sortWILLYS = () =>{ 
      setShowWILLYS(!showWILLYS);
    };





    
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
              const isCOOP = showCOOP && item.butik === "COOP";
              const isICA = showICA && item.butik === "ICA";
              const isWILLYS = showWILLYS && item.butik === "willys";


              return (
                itemData.indexOf(textData) > -1 && (isCOOP || isICA || isWILLYS)
              );




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

          if (item.butik ==="COOP" && showCOOP  ){
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
          else if(item.butik ==="ICA"  && showICA){
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
          else if(item.butik ==="willys"  && showWILLYS) {
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
        <View style={{justifyContent:"center", flexDirection:"row"}}>
              <View style={{height:50, width:50, justifyContent:"space-evenly"}}>
                <Text> COOP</Text>
                <TouchableOpacity onPress={()=>sortCOOP()} style={{backgroundColor:"white",width:15,left:20,borderColor:"black",borderWidth:1,}}>
                  
                <Text style={{color:"black"}}>{showCOOP ? '✓' : ' '}</Text>
                </TouchableOpacity>
              </View>

              <View style={{height:50, width:50, justifyContent:"space-evenly"}}>
                <Text> ICA</Text>
                <TouchableOpacity onPress={()=>sortICA()} style={{backgroundColor:"white",width:15,left:20,borderColor:"black",borderWidth:1,}}>
                  
                <Text style={{color:"black"}}>{showICA ? '✓' : ' '}</Text>
                </TouchableOpacity>
              </View>


              <View style={{height:50, width:50, justifyContent:"space-evenly"}}>
                <Text> Willys</Text>
                <TouchableOpacity onPress={()=>sortWILLYS()} style={{backgroundColor:"white",width:15,left:20,borderColor:"black",borderWidth:1,}}>
                  
                <Text style={{color:"black"}}>{showWILLYS ? '✓' : ' '}</Text>
                </TouchableOpacity>
              </View>
          </View>


        <FlatList style={{marginBottom:200}}
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
