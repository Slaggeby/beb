import React, {useEffect,useState} from "react";
import { Modal, FlatList, StyleSheet, View, TextInput, Button, Text, Image, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, Pressable} from "react-native"


import {database, auth, s} from '../config/firebase';
import { collection, addDoc,setDoc, getDocs, doc, query, where, deleteDoc, updateDoc, onSnapshot, getDoc } from '@firebase/firestore';

import  AccordionListItem  from '../components/AccordionListitem';


const backImage = require("../assets/bebLogo.png");
const listIcon=require('../assets/list-icon.png')
const willysLogo =require("../assets/Willys-logotyp.png")
const icaLogo =require("../assets/ICA-logotyp.png")
const coopLogo =require("../assets/coop-logotyp.png")


export default function Grocery({navigation}){


  
  const user = auth.currentUser;
  const [totalPrice,setTotalPrice]=useState('');
  const [modalVisible, setModalVisible] = useState(false);
 

  const [importedDb, setImportedDb] = useState([]);

  const RemoveItem = async(item)=> {
    const userRef = doc(database, "users", user.uid);
   
    const grocerylistRef = collection(userRef, "grocerylist");
    await deleteDoc(doc(grocerylistRef,item.id));
  }



  
  const fetchProducts = async () => {
    try {
      const unsub = onSnapshot(collection(doc(database, "users", user.uid), "grocerylist"), (querySnapshot) => {
        const docs = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setImportedDb(docs);
        
      });
      return unsub;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const calculateTotalPrice=()=>{
    let totalPrice=0;

    importedDb.forEach(item => {
      totalPrice+=(item.amount*item.item.pris);
    });

    return( <View>
    <Text style = {styles.title}>Your total cost: {Math.round(totalPrice)} kr</Text>
    </View>
    )

  };

  const changeAmount = async (item, amountString) => {
    const userRef = doc(database, "users", user.uid);
    const grocerylistRef = collection(userRef, "grocerylist");
    const itemDocRef = doc(grocerylistRef, item.id);
  
    let newAmount;
    if (amountString === "+") {
      newAmount = item.amount + 1;
    } else if (amountString === "-") {
      newAmount = item.amount - 1;
    } else {
      newAmount = parseInt(amountString);
    }
  
    if (newAmount <= 0 || isNaN(newAmount)) {
      await RemoveItem(item);
    } else {
      await updateDoc(itemDocRef, { amount: newAmount });
    }
  
    setImportedDb((prev) =>
      prev.map((dbItem) => (dbItem.id === item.id ? { ...dbItem, amount: newAmount } : dbItem))
    );
  };



  const generateAmountView=(item)=>{

    return(
      <View>
              <TextInput
                style={styles.amountField}
                placeholder=""
                autoCapitalize="none"
                keyboardType="numeric"
                autoCorrect={false}
                secureTextEntry={false}
                color='black'
                editable={false}
                value={item.amount.toString()}
                onChangeText={(text) => changeAmount(item,text)}
              />
              <TouchableOpacity style={styles.changeAmountButtonplus} onPress={() =>changeAmount(item, "+")}>
          <Text style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', fontSize:24}}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.changeAmountButtonminus} onPress={() =>changeAmount(item,"-")}>
          <Text style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', fontSize:24}}>-</Text>
        </TouchableOpacity>
            </View>


    )

  }

  const renderBorder= (item)=>{
    innerItem=item.item
    
    
    if (innerItem.butik ==="COOP"){
      
      return <View style = {{ flex: 1,borderRadius: 5,borderTopRightRadius: 50, margin:10, backgroundColor:'#fafeff', borderColor:"#00AA46", borderWidth:12,}}>
        <Image source={{ uri: innerItem.bildurl }} style ={styles.productImage} />
        <Image source={coopLogo} style ={styles.grocerImage} />
        
              <Text Text style={{ fontWeight:"bold",marginTop:10, left:150, fontSize:20}}> {innerItem.id}</Text>
               
              <Text style={styles.productSubtext}> {innerItem.leverantör}</Text>
              <Text style={styles.productSubtext}>{innerItem.pristext}</Text>
              <Text style={styles.productSubtext}>{innerItem.jmfpris} :-/kg</Text>
              {generateAmountView(item)}
      </View>
      }
      else if (innerItem.butik ==="ICA"){
        return <View style = {{ flex: 1, borderRadius: 5,borderTopRightRadius: 50, backgroundColor: '#fafeff', margin:10, borderColor:"rgba(232,23,0,255)", borderWidth:12,}}>
        <Image source={{ uri: innerItem.bildurl }} style ={styles.productImage} />
        <Image source={icaLogo} style ={styles.grocerImage} />

              <Text Text style={{ fontWeight:"bold",marginTop:10, left:150, fontSize:20}}> {innerItem.id}</Text>
               
              <Text style={styles.productSubtext}> {innerItem.leverantör}</Text>
              <Text style={styles.productSubtext}>{innerItem.pristext}</Text>
              <Text style={styles.productSubtext}>{innerItem.jmfpris} :-/kg</Text>
              {generateAmountView(item)}
      </View>
      }
      else {return <View style = {{ flex: 1,borderRadius: 5,borderTopRightRadius: 50, backgroundColor: '#fafeff', margin:10, borderColor:"black", borderWidth:12, }}>
      <Image source={{ uri: innerItem.bildurl }} style ={styles.productImage} />
      <Image source={willysLogo} style ={styles.grocerImage} />

      
            <Text Text style={{ fontWeight:"bold",marginTop:10, left:150, fontSize:20}}> {innerItem.id}</Text>
             
            <Text style={styles.productSubtext}> {innerItem.leverantör}</Text>
            <Text style={styles.productSubtext}>{innerItem.pristext}</Text>
            <Text style={styles.productSubtext}>{innerItem.jmfpris} :-/kg</Text>

            {generateAmountView(item)}
            
    </View>}
      
    
    }

    const generateAccordionContent=()=>{

    return(
      <View style={styles.accordionContainer}>
        <Text style={styles.accordionTitle}>Andra listor</Text>
      </View>
)

    }

return(

    
    <View style={styles.container}>

      <View style={{}}>
        <Image source={backImage} style={styles.bebLogo} />
        {calculateTotalPrice()}
      </View>

      <ScrollView style= {{flex: 1}} contentContainerStyle={styles.scrollViewContent}>
        



        <View style= {{flex:1 }}>

        <AccordionListItem title="Your Grocery List" content={generateAccordionContent()} titleStyle={styles.title}/>
          

         

          <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Choose Grocery list</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>

        </View> 
        
        <View >
            {importedDb.map((item) => (
            <View  key={item.id}>
               { renderBorder(item) }
            
              
             
              
            </View>
      ))}
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
        backgroundColor:"#faebeb"
        
  
        
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

      accordionTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: "white",
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
      amountField: {
        marginLeft:295,
        width: 100,
        height:40,
        fontSize:24
      },

      changeAmountButtonplus:{
        width:40,
        height:40,
        backgroundColor:"#d6e6ff",
        borderRadius:10,
        position: "absolute",
        marginLeft:320
      },
      changeAmountButtonminus:{
        width:40,
        height:40,
        backgroundColor:"#d6e6ff",
        borderRadius:10,
        position: "absolute",
        marginLeft:240
      },

      bebLogo: {
        
        width: "100%",
        height: 50,
        top: 10,
        resizeMode: 'contain',
        
      },
      grocerImage:{
          position: "absolute",
        top: 50,
        right:2,
        resizeMode: 'contain',
        width:70,
        height:70,
  
      },
      iconImage:{
        
        top:2,
        width:40,
        height:40,
  
      },
  
      productImage:{
        position: "absolute",
      top: 5,
      left:0,
      resizeMode: 'cover',
      width:70,
      height:70,
  
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
      footerbuttonContainer:{
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        position:"absolute",
        bottom:0,
        flex:0.3,
        backgroundColor:"#D82401",
        flexDirection:"row",
        justifyContent:"space-evenly",
        width:"100%"
  
        
  
      },

      accordionContainer:{
        backgroundColor:'#b82407', 
        marginHorizontal:20,
        padding:20,

        
        
      },
      footerbutton:{
        color: 'black', 
        fontWeight: '600', 
        fontSize: 20,
        margin:10
        
      },centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        marginTop: 600,
        backgroundColor: '#D82401',
        borderTopLeftRadius: 70,
        borderTopRightRadius:70,
        padding: 100,
        width:'100%',
        
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize:24,
        fontWeight: 'bold',
        color:'white'

      },
    
      
})