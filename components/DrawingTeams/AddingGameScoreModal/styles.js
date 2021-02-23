import EStyleSheet from "react-native-extended-stylesheet";

export const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    height: "100%",
  },
  textInputs: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 20,
  },
  TextInput: {
    borderBottomWidth: 2,
    borderBottomColor: "#FE0065",
    fontSize: 30,
    textAlign: "center",
    width: 50,
  },
  scrollInput: {
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    height: 150,
  },
  scoreSetButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    height: 100,
  },
  cancelButton: {
    color: "#FE0065",
    margin: 10,
    fontSize: 16,
  },
  scrollInputView: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    width: "40%",
    backgroundColor: "blue",
  },
});

export default styles;
