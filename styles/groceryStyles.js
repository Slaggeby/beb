import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white"
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

  accordionTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: "white",
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
  amountField: {
    marginLeft:295,
    width: 100,
    height:40,
    fontSize:24
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

  changeAmountButtonplus:{
    width:40,
    height:40,
    backgroundColor:"#d6e6ff",
    borderRadius:10,
    position: "absolute",
    marginLeft:320
  },
  changeAmountButtonminus:{
    width:40,
    height:40,
    backgroundColor:"#d6e6ff",
    borderRadius:10,
    position: "absolute",
    marginLeft:240
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
    bottom:25,
    left:25,
    resizeMode: 'cover',
    width:100,
    height:100,
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

  itemTitle: {
    paddingTop:5,
    height:50,
    fontSize:20,
    fontWeight:"bold",
    top:0,
    left:5
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

  keyboardAvoidingView: {
    flex: 1,
  },

  accordionContainer:{
    backgroundColor:'#b82407', 
    marginHorizontal:20,
    padding:20,

  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    marginTop: 600,
    backgroundColor: '#D82401',
    borderTopLeftRadius: 70,
    borderTopRightRadius:70,
    padding: 100,
    width:'100%',
    
    
  },
  button: {
    borderRadius: 20,
    padding: 10,
    
    height:50
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize:24,
    fontWeight: 'bold',
    color:'white'

  },
  

  
});

export default styles;



