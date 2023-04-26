import { StyleSheet } from "react-native-web";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"#F9EFEB"
      

      
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
    footerbutton:{
      color: 'black', 
      fontWeight: '600', 
      fontSize: 20,
      margin:10
      
    },
  });