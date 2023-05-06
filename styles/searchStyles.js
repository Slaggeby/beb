import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
      },
  
      iconImage:{
        top:2,
        width:50,
        height:50
      },
  
      footerbuttonContainer:{
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        position:"absolute",
        bottom:0,
        backgroundColor:"#B4131B",
        flexDirection:"row",
        justifyContent:"space-evenly",
        width:"100%",
      },

      itemCointainerCOOP:{
        borderRadius: 5,
        borderColor:"#00AA46", 
        borderWidth:7,
  
        flex:1,
        backgroundColor:"#F9EFEB",
        padding: 10, 
        borderRadius: 35,
        margin:10,
      },
      itemCointainerICA:{
        borderRadius: 5,
        borderColor:"rgba(232,23,0,255)", 
        borderWidth:7,
        flex:1,
        backgroundColor:"#F9EFEB",
        padding: 10, 
        borderRadius: 35,
        margin:10,
      },
      itemCointainerWILLYS:{
        borderRadius: 5,
        borderColor:"black", 
        borderWidth:7,
        flex:1,
        backgroundColor:"#F9EFEB",
        padding: 10, 
        borderRadius: 35,
        margin:10,
      },
      itemTitle: {
        padding: 10,
        height:50,
        fontSize:20,
        top:0,
        left:25,
        
      },
      button: {
        backgroundColor: '#CB131C',
        height:38,
        width:100,
        left:260,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        
      },

      bebLogo: {
        width: "100%",
        height: 50,
        top: 10,
        resizeMode: 'contain',
        
      },
      buttonText:{
        fontWeight:"bold",
        color:"white",
      },
  
      productSubtext: { 
      fontWeight:"bold",
       left:150,
       fontSize:15
       
      },
      textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
      },
      productImage:{
        position: "absolute",
      bottom:25,
      left:25,
      resizeMode: 'cover',
      width:100,
      height:100,
    },
    grocerImage:{
      position: "absolute",
    top: 10,
    right:20,
    resizeMode: 'contain',
    width:70,
    height:70,
  
  },
});

export default styles;
