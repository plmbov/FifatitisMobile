import React from "react";
import { Text } from "react-native";
import AppModal from "../../UI/AppModal";
import AppButton from "../../UI/AppButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const NoMoreTeamsModal = (props) => {
  return (
    <AppModal isVisible={props.isVisible} pressedOutside={props.close}>
      <FontAwesomeIcon icon={faExclamationCircle} size={32} />
      <Text>There are no more teams to draw from.</Text>
      <Text>The list has been reset.</Text>
      <AppButton
        text="OK"
        buttonHeight={40}
        buttonWidth="80%"
        color="#FE0065"
        fontColor="#fff"
        clicked={props.close}
      />
    </AppModal>
  );
};

export default NoMoreTeamsModal;
