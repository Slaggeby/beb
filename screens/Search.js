import React, { useState, useEffect } from 'react';
import {SafeAreaView,Text, StyleSheet,View,FlatList,TextInput, Image,TouchableOpacity, TouchableOpacityComponent} from 'react-native';

import { collection, addDoc, getDocs } from '@firebase/firestore';
import {database} from '../config/firebase';

const willysLogo =require("../assets/Willys-logotyp.png")
const icaLogo =require("../assets/ICA-logotyp.png")
const coopLogo =require("../assets/coop-logotyp.png")



export default function Search({navigation}) {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [JSONLIST, setJSONLIST] = useState('');
    const [importedDb, setImportedDb] = useState([]);


  const addToGroceryList = (item) =>{
    console.log("FRÅN ADDDTOGROCERYLIST",item.id)
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
        //console.log(DataList)
        setJSONLIST(JSON.stringify(DataList));
        //console.log("JSONLIST",JSONLIST)
          
        

            
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
               //console.log("item",item)
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
      
      const ItemView = ({item}) => {
        return (
          
          // Flat List Item
          <View>
              <Text
                style={styles.itemStyle}
                >
                
                {item.id}
                {'.'}
                <Image source={{uri:item.bildurl}} style={styles.productImage}  />
                
        
              </Text>
            {renderBorder(item)}
          <TouchableOpacity onPress={()=>addToGroceryList(item)} style={styles.button}>
            <Text>Add to grocerylist</Text>
          </TouchableOpacity>
          </View>


        );

        

      };

        const renderBorder= (item)=>{
          if (item.butik ==="COOP"){
          return(
            <Image source={coopLogo} style ={styles.grocerImage} />
            )
          
          }
          else if(item.butik ==="ICA"){
            return(
              
              <Image source={icaLogo} style ={styles.grocerImage} />
            )
          }
          else {
            return( 
              <Image source={willysLogo} style ={styles.grocerImage} />
            )
          }
                
                
        }




      const ItemSeparatorView = () => {
        return (
          // Flat List Item Separator
          <View
            style={{
              height: 0.5,
              width: '100%',
              backgroundColor: '#C8C8C8',
            }}
          />
        );
      };

      




return(
<SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
)
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },
    itemStyle: {
      padding: 10,
      height:100,
      fontSize:20,
    },
    button: {
      backgroundColor: '#CB131C',
      height: 58,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
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
    top: 5,
    left:0,
    resizeMode: 'cover',
    width:70,
    height:70,
  },
  grocerImage:{
    position: "absolute",
  top: 50,
  right:2,
  resizeMode: 'contain',
  width:70,
  height:70,

},
  });