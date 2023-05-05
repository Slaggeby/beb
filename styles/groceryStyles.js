import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#faebeb"
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



