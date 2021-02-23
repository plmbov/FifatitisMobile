import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faTshirt,
  faTheaterMasks,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";

const AppButton = (props) => {
  const styles = EStyleSheet.create({
    bigButton: {
      alignItems: "center",
      justifyContent: "space-evenly",
      width: props.buttonWidth,
      height: props.buttonHeight,
      opacity: props.opacity,
      borderRadius: 10,
      flexDirection: "row",
      backgroundColor: props.color,
      margin: 10,
    },
    buttonText: {
      color: props.fontColor,
      fontSize: props.fontSize,
      fontWeight: "bold",
    },
  });

  return (
    <TouchableOpacity title={props.text} onPress={props.clicked}>
      <View style={styles.bigButton}>
        {props.icon ? (
          <FontAwesomeIcon
            style={{ color: props.fontColor }}
            icon={props.icon}
            size={32}
          />
        ) : null}
        <Text style={styles.buttonText}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;
