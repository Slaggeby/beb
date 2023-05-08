import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: 'white',
      },
      
      title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: "#D82401",
        marginLeft:10,
        marginTop:10,
        marginBottom:10, 
      },
      
      itemCointainerCOOP:{
        borderRadius: 5,
        borderColor:"#00AA46", 
        borderWidth:4,
        flex:1,
        backgroundColor:"#FFFFFF",
        padding: 10, 
        borderRadius: 35,
        margin:10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
      },

      itemCointainerICA:{
        borderRadius: 5,
        borderColor:"rgba(232,23,0,255)", 
        borderWidth:4,
        flex:1,
        backgroundColor:"#FFFFFF",
        padding: 10, 
        borderRadius: 35,
        margin:10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },

      itemCointainerWILLYS:{
        borderRadius: 5,
        borderColor:"black", 
        borderWidth:4,
        flex:1,
        backgroundColor:"#FFFFFF",
        padding: 10, 
        borderRadius: 35,
        margin:10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },

      itemTitle: {
        padding: 10,
        height:50,
        fontSize:20,
        fontWeight:"bold",
        top:0,
        left:25, 
      },

      productSubtext: {  
        left:150,
        fontSize:15
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

      buttonText:{
        fontWeight:"bold",
        color:"white",
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

      bebLogo: {
        width: "100%",
        height: 50,
        top: 10,
        resizeMode: 'contain', 
      },

      textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
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

});

export default styles;
