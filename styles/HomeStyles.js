import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"white"
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
      productSubtext: { 
        fontWeight:"bold",
         left:150,
         fontSize:15
         
        },
  
      productImage:{
        position: "absolute",
      bottom:25,
      left:25,
      resizeMode: 'cover',
      width:80,
      height:80,
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
        
      top: 10,
      right:-10,
      resizeMode: 'contain',
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
  
      AddToGroceryListButton: {
        backgroundColor: '#CB131C',
        height:38,
        width:100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        left:25,
        
        
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
<<<<<<< HEAD
        
  
        
  
      },
      footerbutton:{
        color: 'white', 
        fontWeight: '600', 
        fontSize: 20,
        margin:10
        
      },
=======
      }

>>>>>>> aa4d707daf3f1eef4da2968acf3c4c779326e618
});

export default styles;
