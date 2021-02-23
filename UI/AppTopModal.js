import React, { useContext, useEffect } from "react";
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

const AppTopModal = (props) => {
  useEffect(() => {
    if (props.isVisible) {
      setTimeout(() => props.setIsVisible(false), 3000);
    }
  }, [props.isVisible]);

  return (
    <Modal
      isVisible={props.isVisible}
      hasBackdrop={false}
      animationIn={"slideInDown"}
      animationInTiming={1000}
      animationOut={"slideOutUp"}
      animationOutTiming={1500}
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}
      coverScreen={false}
      style={styles.modal}
    >
      <View style={styles.modalView}>{props.children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    position: "absolute",
    top: 0,
    left: 0,
    marginTop: 20,
    width: "100%",
    height: 60,
    backgroundColor: "rgba(255,255,255,0.9)",
    flexDirection: "row",
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

export default AppTopModal;
