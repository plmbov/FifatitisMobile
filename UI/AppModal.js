import React, { useContext } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { AppContext } from "../hooks/Contexts";
import AppButton from "./AppButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const AppModal = (props) => {
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      width: 300,
      height: props.modalHeight,
      padding: 10,
      backgroundColor: "rgba(255,255,255,0.97)",
      // borderRadius: 5,
      alignItems: "center",
      justifyContent: "space-evenly",
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });

  return (
    <Modal
      isVisible={props.isVisible}
      backdropColor={"#000"}
      backdropOpacity={0.6}
      animationIn={"fadeInDown"}
      animationInTiming={700}
      animationOut={"bounceOut"}
      animationOutTiming={500}
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}
      onBackdropPress={props.pressedOutside}
      onBackButtonPress={props.pressedOutside}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>{props.children}</View>
      </View>
    </Modal>
  );
};

export default AppModal;
