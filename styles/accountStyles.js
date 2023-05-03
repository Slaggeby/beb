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
      title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: "orange",
        alignSelf: "center",
        paddingBottom: 24,
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
        
      },
      bebLogo:{
        width: "100%",
        height: 50,
        top: 30,
        resizeMode: 'contain',
      
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
      iconImage:{
          
        top:2,
        width:40,
        height:40,
  
      },
      footerbutton:{
          color: 'black', 
          fontWeight: '600', 
          fontSize: 20,
          margin:10, 
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
      
});

export default styles;
