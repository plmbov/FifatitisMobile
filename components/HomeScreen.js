import React from "react";
import { View, ImageBackground, Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import backgroundImage from "./../assets/test2.png";
import Logo from "./Logo";
import {
  faTshirt,
  faTheaterMasks,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import AppButton from "../UI/AppButton";
import LoginMenu from "./LoginMenu";
import UserIconButton from "../UI/UserIconButton";

const HomeScreen = (props) => {
  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <LoginMenu />
        <UserIconButton />
        <View style={styles.buttonsContainer}>
          <Logo text="FIFATITIS" size={80} />
          <AppButton
            text="Draw teams"
            buttonHeight={60}
            buttonWidth={300}
            icon={faTshirt}
            color="#fff"
            clicked={() => props.navigation.navigate("DrawingTeams")}
          />
          <AppButton
            text="Add a game score"
            buttonHeight={60}
            buttonWidth={300}
            icon={faTheaterMasks}
            color="#fff"
            clicked={() => props.navigation.navigate("AddingGameScore")}
          />
          <AppButton
            text="Browse Stats"
            buttonHeight={60}
            buttonWidth={300}
            icon={faTrophy}
            color="#fff"
            clicked={() => props.navigation.navigate("BrowsingStats")}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = EStyleSheet.create({
  container: {
    justifyContent: "center",
    width: "100%",
    height: Dimensions.get("window").height
  },
  backgroundImage: {
    height: Dimensions.get("window").height,
    resizeMode: "cover",
    justifyContent: "center",
  },
  buttonsContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "60%",
  },
  bigButton: {
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 300,
    height: 80,
    backgroundColor: "#fff",
    opacity: 0.7,
    marginTop: 20,
    borderRadius: 50,
    flexDirection: "row",
  },
  buttonText: {
    color: "#000",
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default HomeScreen;
