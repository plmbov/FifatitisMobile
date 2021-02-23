import React, { useState, useContext, useEffect } from "react";
import { Text, View, Alert } from "react-native";
import { AppContext } from "../../../hooks/Contexts";
import AppButton from "../../../UI/AppButton";
import AppModal from "../../../UI/AppModal";
import AppTopModal from "../../../UI/AppTopModal";
import styles from "./styles";
import {
  MATEUSZ_EMAIL_UID,
  MATEUSZ_FACEBOOK_UID,
} from "../../../controlers/uid";
import { dropDownPickerData } from "./dropDownPickerData";
import DropDownPicker from "react-native-dropdown-picker";

const AddingGameScoreModal = (props) => {
  const [playerOneGoals, setPlayerOneGoals] = useState(0);
  const [playerTwoGoals, setPlayerTwoGoals] = useState(0);
  const [winner, setWinner] = useState("");
  const [askForPenaltiesWinner, setAskForPenaltiesWinner] = useState(true);

  const { setShowAddScoreModal, accessToken, user } = useContext(AppContext);

  useEffect(() => {
    if (playerOneGoals > playerTwoGoals) {
      setWinner("Bojo");
      setAskForPenaltiesWinner(false);
    }
    if (playerOneGoals < playerTwoGoals) {
      setWinner("Maciek");
      setAskForPenaltiesWinner(false);
    }
    if (playerOneGoals === playerTwoGoals) {
      setWinner("");
      setAskForPenaltiesWinner(true);
    }
  }, [playerOneGoals, playerTwoGoals]);

  const submitResult = () => {
    if (!user) {
      Alert.alert("Please log in to add the score.");
      return;
    }
    if (user.uid !== MATEUSZ_FACEBOOK_UID && user.uid !== MATEUSZ_EMAIL_UID) {
      Alert.alert("Sorry! Only the developer can add scores. For now... ;)");
      return;
    }
    const d = new Date();

    const currentDateFormatted =
      ("0" + d.getDate()).slice(-2) +
      "-" +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "-" +
      d.getFullYear() +
      " " +
      ("0" + d.getHours()).slice(-2) +
      ":" +
      ("0" + d.getMinutes()).slice(-2);

    const result = {
      Bojo: parseInt(playerOneGoals),
      Maciek: parseInt(playerTwoGoals),
      winner: winner,
      dateAndTime: currentDateFormatted,
      playerOneTeam: props.playerOneTeam,
      playerTwoTeam: props.playerTwoTeam,
    };

    const currentYear = result.dateAndTime.slice(6, 10);
    let currentMonth = result.dateAndTime.slice(3, 5);

    // Games played after midnight on the last day of the month count to the ending month
    if (
      parseInt(currentDateFormatted.slice(0, 2)) === 1 &&
      parseInt(currentDateFormatted.slice(11, 13)) < 6
    ) {
      currentMonth =
        "0" + (parseInt(result.dateAndTime.slice(3, 5)) - 1).toString();
    }

    fetch(
      `https://fifatitis.firebaseio.com/results/${currentYear}/${currentMonth}.json?auth=` +
      accessToken,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setPlayerOneGoals(0);
        setPlayerTwoGoals(0);
        setWinner("");
        if (data.name) {
          props.setShowSubmitResultConfirmation(true);
          setTimeout(() => props.setShowSubmitResultConfirmation(false), 4000);
          props.hideAddScoreButton();
        } else {
          Alert.alert("Something went wrong. Please try again.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <AppModal
        isVisible={props.isVisible}
        modalHeight={400}
        pressedOutside={() => setShowAddScoreModal(false)}
      >
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "black",
              marginBottom: 10,
            }}
          >
            Add the game score:
          </Text>
          <View style={styles.textInputs}>
            <DropDownPicker
              items={dropDownPickerData}
              defaultValue={playerOneGoals}
              containerStyle={{ height: 50, width: "30%" }}
              style={{ backgroundColor: "rgba(250, 250, 250, 0.95)", borderColor: "transparent", borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
              labelStyle={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
              arrowColor={"#FE0065"}
              arrowSize={30}
              itemStyle={{ justifyContent: "center" }}
              dropDownStyle={{ backgroundColor: "rgba(250, 250, 250, 0.9)", borderColor: "transparent", borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
              onChangeItem={(item) => setPlayerOneGoals(item.value)}
            />
            <Text style={{ fontSize: 30 }}>:</Text>
            <DropDownPicker
              items={dropDownPickerData}
              defaultValue={playerTwoGoals}
              containerStyle={{ height: 50, width: "30%" }}
              style={{ backgroundColor: "rgba(250, 250, 250, 0.95)", borderColor: "transparent", borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
              labelStyle={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
              arrowColor={"#FE0065"}
              arrowSize={30}
              itemStyle={{ justifyContent: "center" }}
              dropDownStyle={{ backgroundColor: "rgba(250, 250, 250, 0.9)", borderColor: "transparent", borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
              onChangeItem={(item) => setPlayerTwoGoals(item.value)}
            />
          </View>
          {askForPenaltiesWinner ? (
            <View style={{ alignItems: "center" }}>
              <Text>Who won in penalties?</Text>
              <AppButton
                text="Bojo"
                buttonHeight={30}
                buttonWidth="80%"
                color="#FE0065"
                fontColor="#fff"
                opacity={winner === "Bojo" ? 1 : 0.3}
                clicked={() => {
                  setWinner("Bojo");
                }}
              />
              <AppButton
                text="Maciek"
                buttonHeight={30}
                buttonWidth="80%"
                color="#FE0065"
                fontColor="#fff"
                opacity={winner === "Maciek" ? 1 : 0.3}
                clicked={() => {
                  setWinner("Maciek");
                }}
              />
            </View>
          ) : (
              <View style={{ alignItems: "center" }}>
                <Text>Who won in penalties?</Text>
                <AppButton
                  text="Bojo"
                  buttonHeight={30}
                  buttonWidth="80%"
                  color="#ccc"
                  fontColor="#fff"
                />
                <AppButton
                  text="Maciek"
                  buttonHeight={30}
                  buttonWidth="80%"
                  color="#ccc"
                  fontColor="#fff"
                />
              </View>
            )}
          <View style={{ alignItems: "center" }}>
            <AppButton
              text="OK"
              buttonHeight={40}
              buttonWidth="80%"
              color="#FE0065"
              fontColor="#fff"
              clicked={() => {
                submitResult();
                setShowAddScoreModal(false);
              }}
            />
            <Text
              onPress={() => setShowAddScoreModal(false)}
              style={styles.cancelButton}
            >
              CANCEL
            </Text>
          </View>
        </View>
      </AppModal>
    </>
  );
};

export default AddingGameScoreModal;
