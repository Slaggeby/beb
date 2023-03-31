import React, {useState} from "react";
import {GiftedChat} from "react-native-gifted-chat";
import {View, TextInput, Button} from "react-native"

export default function Chat(){
    const [name,SetName]=useState("")
    return(
    <View>
        <TextInput placeholder ="name" onChangeText={(text) => SetName(text)}/>
        <Button title="det banne mig funkar" onPress={()=> console.log(name)}></Button>
    </View>

);}