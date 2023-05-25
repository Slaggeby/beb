import React, {useEffect,useState} from "react";
import { View, TextInput, Text, Image, TouchableOpacity,Modal,Keyboard} from "react-native"
import styles from '../styles/accountStyles.js';
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import {auth} from '../config/firebase';

const bebLogo = require("../assets/bebLogo.png");
const listIcon=require('../assets/list.png')
const homeIcon=require('../assets/home.png')
const searchIcon=require('../assets/search.png')
const accountIcon=require('../assets/account.png')
const editIcon=require('../assets/editIcon.png')

export default function Account({navigation}){
  const user = auth.currentUser;
  const userPic= user.photoURL;
  const [modalVisible, setModalVisible] = useState(false);
  const [NamemodalVisible, setNameModalVisible] = useState(false);
  const [name1,setName1] = useState(auth.currentUser.displayName)
  const [keyboardVisible, setKeyboardVisible] = useState(false);
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
  useEffect(() => {
    const showListener=Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideListener=Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);
  const changeName = () =>{
    
    updateProfile(auth.currentUser, {  
      
      displayName: name, 
    }).then(() => {
    
    }).catch((error) => {
     
      console.log("error", error)
     
    });}
  const [name, setName] = useState(auth.currentUser.displayName);
  const [newEmail, setEmail]=useState('')
    const [isActive, setIsActive] = useState(false)
    const changeTheme = () =>{
        setIsActive(current => !current) 
    }

    const changeEmailModal=()=>{
      updateProfile(auth.currentUser, {  
        email: newEmail, 
      }).then(() => {
      
        user=auth.currentUser;
        console.log('new Email',user.email)
      }).catch((error) => {
      });}
   return(
    <View style={styles.container}>
      <View style={{ height:60,}}>
      <Text style={styles.title}>Account </Text>
      <Image source={bebLogo} style={styles.bebLogo}/>
      </View>
        <View style = {{flex: 8, marginTop:100}}>
     
            <View styles = {styles.input}>
                <View>
                    <Text style={styles.input}>Name{"\n"}
                    {user ? name : "Loading..."}

                    </Text>   
                    <TouchableOpacity style={{position: 'absolute', marginTop:40, marginLeft: 350}} onPress={()=>{setNameModalVisible(true)}}>
                    
                    <Image source={editIcon} style={{height:35, resizeMode:'cover',width:35}}/>

                    </TouchableOpacity> 
                </View>
                    <Modal
                            animationType="slide"
                            transparent={true}
                            visible={NamemodalVisible}
                            onRequestClose={() => {   
                              setNameModalVisible(!modalVisible);
                           }}>

                            <View style={styles.centeredView}>
                              <View style={ !keyboardVisible ? styles.modalView :[styles.modalView, {marginBottom:300}]}>
                                        <TextInput
                                      style={styles.input}
                                      placeholder="Enter New Name!"
                                      autoCapitalize="none"                          
                                      keyboardType="default"
                                      textContentType="none"
                                      autoFocus={true}
                                      value={name}
                                      maxLength={25}
                                      onChangeText={(text) => setName(text)}
              
                                          />

                                          <TouchableOpacity style={{right:25, top:20, position:"absolute"}} onPress={()=>{setNameModalVisible(false)}}
                                        >
                                            <Text style={{fontSize:36}}>
                                              X
                                            </Text>
                                          </TouchableOpacity>
                                      <TouchableOpacity
                                        style={[styles.button,{backgroundColor:'green'}]}
                                        disabled={name===''}
                                        onPress={()=>{setNameModalVisible(false),changeNameModal()}}
                                        >
                                        <Text style={styles.textStyle}>Update Name</Text>
                                      </TouchableOpacity>
                                </View>
                            </View>
                 </Modal>
                <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                              
                              setNameModalVisible(!modalVisible);
                            }}>

                            <View style={styles.centeredView}>
                              <View style={ !keyboardVisible ? styles.modalView :[styles.modalView, {marginBottom:300}]}>
                                        <TextInput
                                      style={styles.input}
                                      placeholder="Type in new email!"
                                      autoCapitalize="none"                          
                                      keyboardType="default"
                                      textContentType="none"
                                      autoFocus={true}
                                      value={newEmail}
                                      onChangeText={(text) => setEmail(text)}
              
                                          />

                                          <TouchableOpacity style={{right:25, top:20, position:"absolute"}} onPress={()=>{setModalVisible(false)}}
                                        >
                                            <Text style={{fontSize:36}}>
                                              X
                                            </Text>
                                          </TouchableOpacity>
                                      <TouchableOpacity
                                        style={[styles.button,{backgroundColor:'green'}]}
                                        disabled={name===''}
                                        onPress={()=>{setModalVisible(false),changeEmailModal()}}
                                        >
                                        <Text style={styles.textStyle}>Update Email</Text>
                                      </TouchableOpacity>
                                </View>
                            </View>
                 </Modal>

                <View>
                  <Text style = {styles.input}>Email adress{"\n"}
                    {user ? user.email : "Loading..."}
                  </Text> 

                  <TouchableOpacity style={{position: 'absolute', marginTop:40, marginLeft: 350}} onPress={()=>{setModalVisible(true)}}>
                    <Image source={editIcon} style={{height:35, resizeMode:'cover',width:35}}/>
                  </TouchableOpacity>
                </View>

            </View>
        </View>
        
        <View style={{marginBottom:50,width:100,left:300,}}>
          
         <TouchableOpacity style={styles.LogOutbutton} onPress={()=>LogOut()} >

            <Text style={styles.logoutText}> Log Out</Text>
          </TouchableOpacity>
        </View>
    
        <View  style ={styles.footerbuttonContainer}>
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
