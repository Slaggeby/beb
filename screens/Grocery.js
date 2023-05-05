import React, {useEffect,useState} from "react";
import { Keyboard,Modal, FlatList, StyleSheet, View, TextInput, Button, Text, Image, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, KeyboardAvoidingView} from "react-native"
import styles from '../styles/groceryStyles.js';
import {database, auth} from '../config/firebase';
import { collection, addDoc,setDoc, getDocs, doc, query, where, deleteDoc, updateDoc, onSnapshot, getDoc } from '@firebase/firestore';
import  AccordionListItem  from '../components/AccordionListitem';
import createNewGroceryList from "../components/createNewGroceryList.js";

const backImage = require("../assets/bebLogo.png");
const listIcon=require('../assets/list-icon.png')
const willysLogo =require("../assets/Willys-logotyp.png")
const icaLogo =require("../assets/ICA-logotyp.png")
const coopLogo =require("../assets/coop-logotyp.png")

export default function Grocery({navigation}){
  const user = auth.currentUser;
  const [newListName,setnewListName]=useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [accordionContentHeight, setAccordionContentHeight] = useState(0);

  const [importedDb, setImportedDb] = useState([]);
 
  let userLists={};
  let userData={};

  const RemoveItem = async(item)=> {
    const userRef = doc(database, "users", user.uid);
   
    const grocerylistRef = collection(userRef, 'grocerylists', 'yourgrocerylist', 'items');
    await deleteDoc(doc(grocerylistRef,item.id));
  }


  const fetchUserData = async () => {

   
      const docRef = await doc(database, "users", user.uid);
      const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  //console.log("Document data:", docSnap.data());

  userData=docSnap.data();
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
  }



  const fetchProducts = async () => {
    
    await fetchUserData();
    const currentList=await userData.currentlist;

    try {


      const unsub = onSnapshot(collection(doc(database, 'users', user.uid), 'grocerylists', currentList, 'items'), (querySnapshot) => {
        const docs = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setImportedDb(docs);
      });
      return unsub;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };


  const fetchUserLists = async () => {
    const colRef = collection(database, "users", user.uid, "grocerylists");
    const querySnapshot = await getDocs(colRef);
  
    if (querySnapshot.empty) {
      console.log("No grocery lists found");
      return;
    }
  
    const lists = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log("User's grocery lists:", lists);
  
    userLists = lists;
  };
  
 

  useEffect(() => {
    
      
        fetchProducts();
        fetchUserLists();


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
    const grocerylistRef = collection(userRef, "grocerylists", 'yourgrocerylist', 'items' );
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
      <View style={styles.accordionContainer} >
        <Text style={styles.accordionTitle}>Andra listor
       </Text>

       
       <View style={styles.centeredView}>
       <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}
                style={{ flex: 1 }}>
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
          <TextInput
        style={styles.input}
        placeholder="Choose Grocerylist Name!"
        autoCapitalize="none"
        keyboardType="default"
        textContentType="none"
        autoFocus={true}
        value={newListName}
        onChangeText={(text) => setnewListName(text)}
        
        
      />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose,{backgroundColor: newListName === '' ? 'grey' : '#2196F3'}]}
              disabled={newListName===''}
              onPress={() =>{ setModalVisible(!modalVisible), createNewGroceryList(newListName); if(newListName.length>0){setnewListName('')}}}>
              <Text style={styles.textStyle}>Create!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </KeyboardAvoidingView >
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>New Grocerylist</Text>
      </TouchableOpacity>
    </View>
    
       <Text>
       {"\n"}
       </Text>
       
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
        <AccordionListItem title="Your Grocery List" content={generateAccordionContent()} titleStyle={styles.title}  inputContentHeight={200}/>
          
          

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
)}
