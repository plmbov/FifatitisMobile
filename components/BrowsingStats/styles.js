import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

export const styles = EStyleSheet.create({
  container: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    height: Dimensions.get("window").height - 300,
    marginTop: 50
  },
  loaderContainer: {
    width: "100%",
    height: "100%",
    marginTop: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  backgroundImage: {
    height: Dimensions.get("window").height,
    resizeMode: "cover",
    justifyContent: "center",
  },
  statsContainer: {
    width: "100%",
    height: "100%",
    marginTop: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  singlePlayerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  playerName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  photo: {
    height: 120,
    width: 100,
  },
  wins: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: "bold",
  },
  winsNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  goals: {
    fontSize: 18,
    fontWeight: "bold",
  },
  goalsNumber: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
