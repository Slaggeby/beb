import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
  
        
      },
      button: {
        backgroundColor: '#CB131C',
        height:58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom:140,
      },

      LogOutbutton: {
        backgroundColor: "#F6F7FB",
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        
      },
      
      logoutText: {
        fontSize: 16,
        fontWeight:"bold",
        color:"black",
       
      },




      title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: "#D82401",
        marginLeft:10,
        marginBottom:10, 
        top:10,
      },
      input: {
        backgroundColor: "#F6F7FB",
        height: 70,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
        marginTop:25,
        
      },

     



      backImage: {
        width: "100%",
        height: 140,
        position: "absolute",
        top: 0,
        resizeMode: 'cover',
        width:100,
        height:100,
        borderRadius:100/2,
        
      },modalView: {
        marginTop: 200,
        backgroundColor: '#D82401',
        
        borderRadius:70,
        padding: 60,
        width:'80%',
        
        
      },
      centeredView: {
        
        justifyContent: 'center',
        alignItems: 'center',
        
      },
      bebLogo:{
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
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      
      
});

export default styles;
