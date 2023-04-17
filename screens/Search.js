import React, { useState } from 'react';
import {StyleSheet, View, TextInput, Button, Text, Image, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, Pressable} from "react-native"

import { ActivityIndicator } from 'react-native';
import { collection, addDoc, getDocs } from '@firebase/firestore';
import {database} from '../config/firebase';

const fetchProducts= async ()=> {
    await getDocs(collection(database, "products"))
        .then((QuerySnapshot)=>{
            const newData = querySnapshot.getDocs
                .map((doc)=>({...doc.data(),id:doc.id }));
                console.log(newData);
        })

fetchProducts();


}


export default function Search({navigation}) {
    


    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [users, setUsers] = useState([]); // Initial empty array of users

return(
<View>

</View>
)
}