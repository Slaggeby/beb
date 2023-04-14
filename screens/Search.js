import React, { useState } from 'react';
import {StyleSheet, View, TextInput, Button, Text, Image, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, Pressable} from "react-native"

import { ActivityIndicator } from 'react-native';
import { collection, getDocs } from '@firebase/firestore';
import {db} from '../config/firebase';


// const querySnapshot = await getDocs(collection(db, "products"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });

export default function Search({navigation}) {
    


    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [users, setUsers] = useState([]); // Initial empty array of users

return(
<View>

</View>
)
}