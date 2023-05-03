import React, {useEffect,useState} from "react";
import {StyleSheet, View, TextInput, Button, Text, Image, SafeAreaView, TouchableOpacity, StatusBar} from "react-native"
import styles from '../styles/accountStyles.js';
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import {database, auth} from '../config/firebase';
import { collection, addDoc,setDoc, getDocs, doc, query, where, deleteDoc, updateDoc, onSnapshot, getDoc } from '@firebase/firestore';


const backImage = require("../assets/backImage.png");
const bebLogo = require("../assets/bebLogo.png");
const listIcon=require('../assets/list-icon.png')




export default function Account({navigation}){
  const user = auth.currentUser;
  //console.log("user",user)
  const [ImportedUserData, setImportedUserData]=useState([])
  
  //const displayName = user.displayName;
  //console.log("displayName", displayName)

  const LogOut=() =>{
    const auth = getAuth();
    console.log('Signing out user:', auth.currentUser.email)
    signOut(auth).then(() => {
      console.log('Signed Out')
      navigation.navigate("Login")
    }).catch((error) => {
      console.log('logout error')
    });
  }


  const changeName = () =>{
    console.log("u tried")

  }

  const [text, onChangeText] = React.useState('Useless Text');


  useEffect(() => {
    console.log("USE");
  }, [text]);



  updateProfile(auth.currentUser, {
    
    displayName: text, photoURL: "https://example.com/jane-q-user/profile.jpg"
  }).then(() => {
    // Profile updated!
    // ...
  }).catch((error) => {
    // An error occurred
    // ...
  });
 







    const [isActive, setIsActive] = useState(false)
    const changeTheme = () =>{
        setIsActive(current => !current)
        
    }

    useEffect(() => {
      fetchUserData();
    }, []);

    const fetchUserData = async () => {
      try {
        const q = query(collection(database, "users"), where("uid", "==", user.uid));
        const unsub = onSnapshot(q, (querySnapshot) => {
          const docs = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setImportedUserData(docs);
         
          
        });
        
        return unsub;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    };

    
   return(
    <View style={styles.container}>

      <View>
      <Image source={bebLogo} style={styles.bebLogo}/>
      </View>
      


            <View styles={{flex: 3}}>
                <Image source={backImage} style={styles.backImage} />
            </View>

        <View style = {{flex: 8, marginTop:100}}>
        

            <View styles = {styles.input}>
                <View>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeText}
                  value={text}
                />
                  

                  

                <Text style={styles.input}>
                {user ? user.displayName : "Loading..."}
                </Text>

                  
                </View>

                <View>
                  <Text style = {styles.input}>Email adress{"\n"}
                  
                  {user ? user.email : "Loading..."}
                  </Text>
                  
                </View>

            </View>
       
        </View>
        
        <View style={{marginBottom:50,width:100,left:300,}}>
          
         <TouchableOpacity style={styles.button} onPress={()=>LogOut()} >

            <Text style={{fontWeight: 'bold', color: '#FFFFFF', fontSize: 18}}> Log Out</Text>
          </TouchableOpacity>
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
       

       

    </View>

   )
}
