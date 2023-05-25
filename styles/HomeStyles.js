import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"white"
      },

      title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: "#D82401",
        marginLeft:10,
        marginBottom:10, 
        top:10,
        
      },

      cointainerCOOP:{
        flex:1,
        borderRadius:35,
        borderColor:"#00AA46", 
        borderWidth:0,
        marginTop:10,
        backgroundColor:"#CCFFCC",
        margin:10
      },

      itemCointainerCOOP:{
        borderRadius: 5,
        borderColor:"#00AA46", 
        borderWidth:4,
        flex:1,
        backgroundColor:"white",
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

      cointainerICA:{
        flex:1,
        borderRadius:35,
        borderColor:"rgba(232,23,0,255)", 
        borderWidth:0,
        marginTop:10,
        backgroundColor:"#F9EFEB",
        margin:10
      },
  
      itemCointainerICA:{
        borderRadius: 5,
        borderColor:"rgba(232,23,0,255)", 
        borderWidth:4,
        flex:1,
        backgroundColor:"white",
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

      cointainerWILLYS:{
        flex:1,
        borderRadius:35,
        borderColor:"black", 
        borderWidth:0,
        marginTop:10,
        backgroundColor:"#cfd7e3",
        margin:10
      },

      itemCointainerWILLYS:{
        borderRadius: 5,
        borderColor:"black", 
        borderWidth:4,
        flex:1,
        backgroundColor:"white",
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
        paddingTop:5,
        height:50,
        fontSize:20,
        fontWeight:"bold",
        top:0,
        left:5
      },

      productSubtext: {  
        left:150,
        fontSize:15
      },

      button: {
        backgroundColor: '#CB131C',
        height:40,
        width:100,
        left:225,
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
        right:-20,
        resizeMode: 'contain',
        width:100,
        height:100
      },

    scrollViewContent: {
        flexGrow: 1,
      },
  

      bebLogo: {
        alignSelf:"center",
        height: 50,
        top:-40,
        resizeMode: 'contain', 
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
      }

});

export default styles;
