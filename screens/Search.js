import React, { useState, useEffect } from 'react';
import {SafeAreaView,Text, StyleSheet,View,FlatList,TextInput,} from 'react-native';

import { collection, addDoc, getDocs } from '@firebase/firestore';
import {database} from '../config/firebase';




export default function Search({navigation}) {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    //den här ger hur datan ser ut 
    async function logJSONData() {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const jsonData = await response.json();
      //console.log(jsonData);
    }
    

    logJSONData()
    
    const [importedDb, setImportedDb] = useState([]);


    const fetchProducts = async () => {
        try {
          const querySnapshot = await getDocs(collection(database, "products"));
          const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
         
          setImportedDb(newData);

          let DataList = [];
          mappedData= newData.map((item) => {
            //console.log(item.id)
             DataList.push(item)
          })
        
        console.log(DataList)
        //let obj = JSON.parse(DataList);
        //console.log(obj)
          

            
        } catch (error) {
          console.error("Error fetching products:", error);
          throw error;
        }
      };

      useEffect(() => {
        fetchProducts();
      }, []);



    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
       

          .then((response) => response.json())
          .then((responseJson) => {
            setFilteredDataSource(responseJson);
            setMasterDataSource(responseJson);
            //console.log(responseJson.title)
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);

      const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
          // Inserted text is not blank
          // Filter the masterDataSource
          // Update FilteredDataSource
          const newData = masterDataSource.filter(
            function (item) {
              const itemData = item.title
                ? item.title.toUpperCase()
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
          <Text
            style={styles.itemStyle}
            onPress={() => getItem(item)}>
            {item.id}
            {'.'}
            {item.title.toUpperCase()}
          </Text>
        );
      };
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

      const getItem = (item) => {
        // Function for click on an item
        alert('Id : ' + item.id + ' Title : ' + item.title);
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
    },
    textInputStyle: {
      height: 40,
      borderWidth: 1,
      paddingLeft: 20,
      margin: 5,
      borderColor: '#009688',
      backgroundColor: '#FFFFFF',
    },
  });