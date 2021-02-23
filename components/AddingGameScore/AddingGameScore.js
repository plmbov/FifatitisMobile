import React, { useState, useContext, useEffect } from "react";
import { Text, View, Alert, ImageBackground } from "react-native";
import { AppContext } from "../../hooks/Contexts";
import AppButton from "../../UI/AppButton";
import AppTopModal from "../../UI/AppTopModal";
import styles from "./styles";
import {
  MATEUSZ_EMAIL_UID,
  MATEUSZ_FACEBOOK_UID,
} from "../../controlers/uid";
import { goalsNumber } from "./dropDownPickerData";
import DropDownPicker from "react-native-dropdown-picker";
import UserIconButton from "../../UI/UserIconButton";
import backgroundImage from '../../assets/test2.png'

var teams = [{
  value: "Other",
  label: "Other",
},]

const AddingGameScore = (props) => {
  const [playerOneTeam, setPlayerOneTeam] = useState("Other");
  const [playerTwoTeam, setPlayerTwoTeam] = useState("Other");
  const [playerOneGoals, setPlayerOneGoals] = useState(0);
  const [playerTwoGoals, setPlayerTwoGoals] = useState(0);
  const [winner, setWinner] = useState("");
  const [askForPenaltiesWinner, setAskForPenaltiesWinner] = useState(true);
  const [
    showSubmitResultConfirmation,
    setShowSubmitResultConfirmation,
  ] = useState(false);

  const { setShowAddScoreModal, accessToken, user, allAvailableTeams } = useContext(AppContext);

  useEffect(() => {
    allAvailableTeams.map(team => {
      teams.push({
        value: team,
        label: team,
      }
      )
    })
    teams.sort((a, b) => a.label.localeCompare(b.label))
  }, []);

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
      playerOneTeam: playerOneTeam,
      playerTwoTeam: playerTwoTeam,
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
          setShowSubmitResultConfirmation(true);
          setTimeout(() => setShowSubmitResultConfirmation(false), 4000);
          props.hideAddScoreButton();
        } else {
          Alert.alert("Cannot add the score. Please log in.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <AppTopModal
        isVisible={showSubmitResultConfirmation}
        setIsVisible={setShowSubmitResultConfirmation}
      >
        <Text style={{ color: "green", fontWeight: "bold", fontSize: 16 }}>
          Result successfully added to database!
        </Text>
      </AppTopModal>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <UserIconButton />
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "black",
              marginBottom: 10,
              textAlign: "center"
            }}
          >
            Add the game score:
          </Text>
          <View style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", width: "50%", textAlign: "center" }}>Bojo</Text>
            <Text style={{ fontSize: 24, fontWeight: "bold", width: "50%", textAlign: "center" }}>Maciek</Text>
          </View>
          <View style={styles.textInputs}>
            <DropDownPicker
              items={teams}
              defaultValue={"Other"}
              containerStyle={{ height: 50, width: "40%" }}
              style={{ backgroundColor: "rgba(250, 250, 250, 0.95)", borderColor: "transparent", borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
              labelStyle={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
              arrowColor={"#FE0065"}
              arrowSize={30}
              itemStyle={{ justifyContent: "center" }}
              dropDownStyle={{ backgroundColor: "rgba(250, 250, 250, 0.9)", borderColor: "transparent", borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
              onChangeItem={(item) => setPlayerOneTeam(item.value)}
            />
            <Text style={{ fontSize: 30 }}> </Text>
            <DropDownPicker
              items={teams}
              defaultValue={"Other"}
              containerStyle={{ height: 50, width: "40%" }}
              style={{ backgroundColor: "rgba(250, 250, 250, 0.95)", borderColor: "transparent", borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
              labelStyle={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
              arrowColor={"#FE0065"}
              arrowSize={30}
              itemStyle={{ justifyContent: "center" }}
              dropDownStyle={{ backgroundColor: "rgba(250, 250, 250, 0.9)", borderColor: "transparent", borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
              onChangeItem={(item) => setPlayerTwoTeam(item.value)}
            />
          </View>
          <View style={styles.textInputs}>
            <DropDownPicker
              items={goalsNumber}
              defaultValue={playerOneGoals}
              containerStyle={{ height: 50, width: "40%" }}
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
              items={goalsNumber}
              defaultValue={playerTwoGoals}
              containerStyle={{ height: 50, width: "40%" }}
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
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default AddingGameScore;
