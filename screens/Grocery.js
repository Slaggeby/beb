import React, {useEffect,useState} from "react";
import { Modal,  View, TextInput, Text, Image,  TouchableOpacity,  ScrollView, KeyboardAvoidingView} from "react-native"
import styles from '../styles/groceryStyles.js';
import {database, auth} from '../config/firebase';
import { collection, getDocs, doc, deleteDoc, updateDoc, onSnapshot, getDoc } from '@firebase/firestore';
import  AccordionListItem  from '../components/AccordionListitem';
import createNewGroceryList from "../components/createNewGroceryList.js";

const backImage = require("../assets/bebLogo.png");
const listIcon=require('../assets/list.png')
const homeIcon=require('../assets/home.png')
const searchIcon=require('../assets/search.png')
const accountIcon=require('../assets/account.png')
const willysLogo =require("../assets/Willys-logotyp.png")
const icaLogo =require("../assets/ICA-logotyp.png")
const coopLogo =require("../assets/coop-logotyp.png")

export default function Grocery({navigation}){
  const user = auth.currentUser;
  const [newListName,setnewListName]=useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [accordionContentHeight, setAccordionContentHeight]=useState(0);
  const [importedDb, setImportedDb] = useState([]);
 const [userData2, setUserData2] = useState({});
 const [refresh, setRefresh] = useState(false);
 const [userLists, setUserLists]=useState([]);
  // let userLists=[];
  let userData={};
  let testData='ricknmorty'

  const RemoveItem = async(item)=> {
    const userRef = doc(database, "users", user.uid);
    const grocerylistRef = collection(userRef, 'grocerylists', userData.currentlist, 'items');
    await deleteDoc(doc(grocerylistRef,item.id));
  }

  const removeList=async(list)=>{
    const userRef = doc(database, 'users', user.uid);
    const yourGroceryListsRef = collection(userRef, 'grocerylists');
    const yourGroceryListDocRef = doc(yourGroceryListsRef, list);
    await deleteDoc(yourGroceryListDocRef);
    fetchUserLists();

  }


  const fetchUserData = async () => {
      console.log("fetchuserData ran")
      const docRef = await doc(database, "users", user.uid);
      const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  //console.log("Document data:", docSnap.data());

  userData=docSnap.data();
  setUserData2(docSnap.data());
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
  }



  const fetchProducts = async () => {
    
    await fetchUserData();
    const currentList=await userData.currentlist;
    console.log('FetchLog currentList from UserData', currentList)
    console.log('FetchLog currentList from UserData2', userData2.currentlist)

    try {
      const unsub = onSnapshot(collection(doc(database, 'users', user.uid), 'grocerylists',userData.currentlist , 'items'), (querySnapshot) => {
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
    let accordionHeight=200;
    const lists = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log("User's grocery lists:", lists);
    await lists.map(() => (accordionHeight+=50) )
    setAccordionContentHeight(accordionHeight);
    setUserLists(lists)

  };
  
 

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserData();
      await fetchUserLists();
      await fetchProducts();
    };
  
    fetchData();
  }, []);

  const changeCurrentList=async (listName)=>{
    const userRef = doc(database, 'users', user.uid);
    await updateDoc(userRef, { currentlist: listName });




  }
  

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
    await fetchUserData();
    console.log('i changeamount:', userData)
    const userRef = doc(database, "users", user.uid);
    const grocerylistRef = collection(userRef, "grocerylists", userData.currentlist, 'items' );
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

          <View >
            {userLists.map((item) => (
            <View  key={item.id}>
              <TouchableOpacity onPress={() =>{changeCurrentList(item.id)}}>
               <Text style={styles.accordionTitle}>{item.id}
       </Text>
       </TouchableOpacity>
       <TouchableOpacity style={{position:'absolute', marginLeft:300}} onPress={() =>{removeList(item.id)}} >
               <Text style={styles.accordionTitle}>X
       </Text>
       </TouchableOpacity>

            </View>
      ))}
      </View>

        
        

       
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
              onPress={() =>{ setModalVisible(!modalVisible), createNewGroceryList(newListName), setRefresh(!refresh),fetchUserData,fetchProducts(), fetchUserLists();
                navigation.navigate("Grocery"); if(newListName.length>0){setnewListName('')}}}>
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
        <AccordionListItem title={userData2.currentlist} content={generateAccordionContent()} titleStyle={styles.title}  inputContentHeight={accordionContentHeight}/>
          
          

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
)}
