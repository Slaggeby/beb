import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "#B4131B",
    alignSelf: "center",
    paddingBottom: 24,
  },

  input: {
    backgroundColor: "#FEF5F5",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },

  bebLogo: {
    width: "100%",
    height: 150,
    top: 30,
    resizeMode: 'contain',
  },

  whiteSheet: {
    width: '100%',
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 60,
  },

  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },

  button: {
    backgroundColor: '#CB131C',
    height:58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  }
});

export default styles;
