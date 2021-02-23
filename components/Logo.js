import React from "react";
import { View, Text, Button } from "react-native";
import { useFonts } from "expo-font";

const Logo = (props) => {
  let [fontsLoaded] = useFonts({
    EASPORTS: require("../assets/fonts/EASPORTS15.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>FIFATITIS</Text>;
  } else {
    return (
      <Text
        style={{
          fontFamily: "EASPORTS",
          fontSize: props.size,
          color: "#fff",
          marginBottom: 40,
        }}
      >
        {props.text}
      </Text>
    );
  }
};

export default Logo;
