import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

export const styles = EStyleSheet.create({
  container: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    height: Dimensions.get("window").height - 150,
    marginTop: 100
  },
  backgroundImage: {
    height: Dimensions.get("window").height,
    resizeMode: "cover",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  focusArea: {
    width: "80%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.6)",
    alignItems: "center",
    justifyContent: "space-evenly",
    overflow: "hidden",
  },
  topMenu: {
    position: "absolute",
    top: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "25%",
  },
  topButton: {
    backgroundColor: "rgba(255,255,255,0.3)",
    width: "50%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  topButtonClicked: {
    backgroundColor: "rgba(254, 0, 101, .8)",
  },
  teamsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  logoAndTeamName: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  playerName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 50,
  },
  clubLogo: {
    height: "30%",
    width: "100%",
    resizeMode: "contain",
    margin: 10,
  },
  teamName: {
    fontSize: 20,
  },
  gameScoreContainer: {
    justifyContent: "center",
    alignItems: "center",
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
  modalText: {
    width: "80%",
    textAlign: "center",
    fontWeight: "bold",
    flexWrap: "wrap",
  },
  bottomButtonsContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    height: 190,
  },
});

export default styles;
