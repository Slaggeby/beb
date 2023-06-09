import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TextInput, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/searchStyles.js';
import { collection, getDocs, } from '@firebase/firestore';
import { database } from '../config/firebase';
import addToGroceryList from "../components/addToGroceryList.js";
//Images
const backImage = require("../assets/bebLogo.png");
const willysLogo = require("../assets/Willys-logotyp.png")
const icaLogo = require("../assets/ICA-logotyp.png")
const coopLogo = require("../assets/coop-logotyp.png")
const listIcon = require('../assets/list.png')
const homeIcon = require('../assets/home.png')
const searchIcon = require('../assets/search.png')
const accountIcon = require('../assets/account.png')

export default function Search({ navigation }) {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [JSONLIST, setJSONLIST] = useState('');
  const [showCOOP, setShowCOOP] = useState(true)
  const [showICA, setShowICA] = useState(true)
  const [showWILLYS, setShowWILLYS] = useState(true)
  const [showOnSale, setShowOnSale] = useState(false)

  const sortCOOP = () => {
    setShowCOOP(!showCOOP);
  };
  const sortICA = () => {
    setShowICA(!showICA);
  };
  const sortWILLYS = () => {
    setShowWILLYS(!showWILLYS);
  };

  const sortOnSale = () => {
    setShowOnSale(!showOnSale)
  }

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(database, "products"));
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setJSONLIST(JSON.stringify(newData));

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
    if (JSONLIST !== "") {
      const responseJson = JSON.parse(JSONLIST);
      setFilteredDataSource(responseJson);
      setMasterDataSource(responseJson);
      
    }

  }, [JSONLIST])

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(

        function (item) {

          const itemData = item.titel
            ? item.titel.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          const isCOOP = showCOOP && item.butik === "COOP";
          const isICA = showICA && item.butik === "ICA";
          const isWILLYS = showWILLYS && item.butik === "willys";
          const isSale = showOnSale && item.onsale

          return (
            itemData.indexOf(textData) > -1 && (isCOOP || isICA || isWILLYS || isSale)
          );

        });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);

      setSearch(text);
    }
  };


  const renderItems = ({ item }) => {
    if (item.butik === "COOP" && showCOOP && !showOnSale || item.butik === "COOP" && item.onsale && showOnSale && showCOOP) {
      return (
        <View>
          <View style={styles.itemCointainerCOOP}>
            <Text style={styles.itemTitle}> {item.titel} </Text>
            <Text style={styles.productSubtext}> {item.leverantör} </Text>
            <Text style={styles.productSubtext}> {item.pristext} </Text>
            <Text style={styles.productSubtext}> {item.jmfpris} kr/kg </Text>
            <Image source={{ uri: item.bildurl }} style={styles.productImage} />
            <TouchableOpacity onPress={() => addToGroceryList(item)} style={styles.button}>
              <Text style={styles.buttonText}>Add to grocerylist</Text>
            </TouchableOpacity>
          </View>
          <Image source={coopLogo} style={styles.grocerImage} />
        </View>

      )

    }
    else if (item.butik === "ICA" && showICA && !showOnSale || item.butik === "ICA" && item.onsale && showOnSale && showICA) {
      return (
        <View>
          <View style={styles.itemCointainerICA} >
            <Text style={styles.itemTitle}>{item.titel}</Text>
            <Text style={styles.productSubtext}>{item.leverantör}</Text>
            <Text style={styles.productSubtext}>{item.pristext}</Text>
            <Text style={styles.productSubtext}>{item.jmfpris} kr/kg</Text>
            <Image source={{ uri: item.bildurl }} style={styles.productImage} />
            <TouchableOpacity onPress={() => addToGroceryList(item)} style={styles.button}>
              <Text style={styles.buttonText}>Add to grocerylist</Text>
            </TouchableOpacity>
          </View>
          <Image source={icaLogo} style={styles.grocerImage} />
        </View>


      )
    }
    else if (item.butik === "willys" && showWILLYS && !showOnSale || item.butik === "willys" && item.onsale && showOnSale && showWILLYS) {
      return (
        <View>
          <View style={styles.itemCointainerWILLYS}>
            <Text style={styles.itemTitle}>{item.titel}</Text>
            <Text style={styles.productSubtext}>{item.leverantör}</Text>
            <Text style={styles.productSubtext}>{item.pristext} </Text>
            <Text style={styles.productSubtext}>{item.jmfpris} kr/kg </Text>
            <Image source={{ uri: item.bildurl }} style={styles.productImage} />
            <TouchableOpacity onPress={() => addToGroceryList(item)} style={styles.button}>
              <Text style={styles.buttonText}>Add to grocerylist</Text>
            </TouchableOpacity>
          </View>
          <Image source={willysLogo} style={styles.grocerImage} />
        </View>
      )
    }
  }

  const ItemSeparatorView = () => {
    return  ( 
       <View style={{width: '100%',backgroundColor: 'white',}} />
       )
  };

  return (
    <View style={styles.container}>
      <View style={{ height:60,}}>
        <Text style={styles.title}>Search </Text>
        <Image source={backImage} style={styles.bebLogo} />
      </View>
      
      <View style={{ marginTop: 7 }}>
      
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <Text style={{left:10, color: "#D82401",fontWeight:"bold"}} >Filter By:</Text>
        <View style={{ justifyContent: "center", flexDirection: "row" }}>
          <View style={{ height: 30, flexDirection: 'row' }}>
            <Image source={coopLogo} style={{ resizeMode: 'contain', height: 36, width: 40 }} />
            <View style={{ justifyContent: 'center', paddingRight: 20 }}>
              <TouchableOpacity onPress={() => sortCOOP()} style={{ backgroundColor: "white", width: 30, height: 30, left: 8, borderColor: "black", borderWidth: 1, borderRadius: 15 }}>
                <Text style={{ color: "black", fontSize: 20 }}> {showCOOP ? '✓' : ' '} </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: 30, flexDirection: 'row' }}>
            <Image source={icaLogo} style={{ resizeMode: 'contain', height: 30, width: 40 }} />
            <View style={{ justifyContent: 'center', paddingRight: 20 }}>
              <TouchableOpacity onPress={() => sortICA()} style={{ backgroundColor: "white", width: 30, height: 30, left: 8, borderColor: "black", borderWidth: 1, borderRadius: 15 }}>
                <Text style={{ color: "black", fontSize: 20 }}> {showICA ? '✓' : ' '} </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: 30, flexDirection: 'row' }}>
            <Image source={willysLogo} style={{ resizeMode: 'contain', height: 60, width: 50, bottom: 15 }} />
            <View style={{ justifyContent: 'center', paddingRight: 20 }}>
              <TouchableOpacity onPress={() => sortWILLYS()} style={{ backgroundColor: "white", width: 30, height: 30, left: 8, borderColor: "black", borderWidth: 1, borderRadius: 15 }}>
                <Text style={{ color: "black", fontSize: 20 }}> {showWILLYS ? '✓' : ' '} </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: 30, flexDirection: 'row' }}>
            <Text style={{ marginTop: 6, color: "#D82401", fontWeight:"bold" }}>On sale</Text>
            <View style={{ justifyContent: 'center', paddingRight: 20 }}>
              <TouchableOpacity onPress={() => sortOnSale()} style={{ backgroundColor: "white", width: 30, height: 30, left: 8, borderColor: "black", borderWidth: 1, borderRadius: 15 }}>
                <Text style={{ color: "black", fontSize: 20 }}> {showOnSale ? '✓' : ' '} </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>{/*  */}
        <FlatList style={{ marginBottom: 200 }}
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={renderItems} />
      </View>
      <View style={styles.footerbuttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image source={homeIcon} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <Image source={searchIcon} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Grocery")}>
          <Image source={listIcon} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Account")}>
          <Image source={accountIcon} style={styles.iconImage} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
