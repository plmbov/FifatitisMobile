import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from "firebase";
import styles from "./styles";
import backgroundImage from "../../assets/test2.png";
import Logo from "../Logo";
import AppButton from "../../UI/AppButton";
import ClubLogos from "../../assets/club-logo/imagesToExport";
import { AppContext } from "../../hooks/Contexts";
import UserIconButton from "../../UI/UserIconButton";
import AddingGameScoreModal from "./AddingGameScoreModal/AddingGameScoreModal";
import NoMoreTeamsModal from "./NoMoreTeamsModal";
import { FadeInView } from "../../UI/FadeInView";
import PregameStatsModal from "./PregameStatsModal/PregameStatsModal";
import AppTopModal from "../../UI/AppTopModal";

const DrawingTeams = () => {
  const [teams, setTeams] = useState(null);
  const [clubs, setClubs] = useState(null);
  const [clubsFullList, setClubsFullList] = useState(null);
  const [nationalTeams, setNationalTeams] = useState(null);
  const [nationalTeamsFullList, setNationalTeamsFullList] = useState(null);
  const [showNoMoreTeamsModal, setShowNoMoreTeamsModal] = useState(false);
  const [playerOneTeam, setPlayerOneTeam] = useState("?");
  const [playerTwoTeam, setPlayerTwoTeam] = useState("?");
  const [clubsClicked, setClubsClicked] = useState(true);
  const [nationalTeamsClicked, setNationalTeamsClicked] = useState(false);
  const [
    showStatsAndAddScoreButtons,
    setShowStatsAndAddScoreButtons,
  ] = useState(false);
  const [showPregameStatsModal, setShowPregameStatsModal] = useState(false);
  const [
    showSubmitResultConfirmation,
    setShowSubmitResultConfirmation,
  ] = useState(false);

  const {
    showAddScoreModal,
    setShowAddScoreModal,
    user,
    setUser,
    setAccessToken,
    setAllAvailableTeams
  } = useContext(AppContext);

  useEffect(() => {
    fetch("https://fifatitis.firebaseio.com/teams.json")
      .then((response) => response.json())
      .then((data) => {
        setClubsFullList(Object.keys(data.clubs));
        setNationalTeamsFullList(Object.keys(data.nationalTeams));
      })
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("clubs")
      .then(res => {
        if (res) {
          return setClubs(JSON.parse(res));
        }
        AsyncStorage.setItem("clubs", clubsFullList);
        setClubs(clubsFullList)
      })
  }, [clubsFullList])

  useEffect(() => {
    AsyncStorage.getItem("nationalTeams")
      .then(res => {
        if (res) {
          return setNationalTeams(JSON.parse(res));
        }
        AsyncStorage.setItem("nationalTeams", nationalTeamsFullList);
        setNationalTeams(nationalTeamsFullList)
      })
  }, [nationalTeamsFullList])

  useEffect(() => {
    setTeams(clubs)
  }, [clubs])

  useEffect(() => {
    if (clubsFullList) {
      const allFetchedTeam = clubsFullList.concat(nationalTeamsFullList)
      setAllAvailableTeams(allFetchedTeam)
    }
  }, [clubs]);

  const handleTopButtonClicked = (category) => {
    if (category === "Clubs") {
      setClubsClicked(true);
      setNationalTeamsClicked(false);
      setTeams(clubs);
      setPlayerOneTeam("?")
      setPlayerTwoTeam("?")
      setShowStatsAndAddScoreButtons(false)
    }
    if (category === "NationalTeams") {
      setClubsClicked(false);
      setNationalTeamsClicked(true);
      setTeams(nationalTeams);
      setPlayerOneTeam("?")
      setPlayerTwoTeam("?")
      setShowStatsAndAddScoreButtons(false)
    }
  };

  const drawTeams = () => {
    if (teams.length < 2) {
      if (clubsClicked) {
        setClubs(clubsFullList);
        setTeams(clubsFullList);
        setShowNoMoreTeamsModal(true);
      }
      if (nationalTeamsClicked) {
        setNationalTeams(nationalTeamsFullList);
        setTeams(nationalTeamsFullList);
        setShowNoMoreTeamsModal(true);
      }
    } else {
      let i = 0;
      const drawingInterval = setInterval(() => {
        i++;
        let playerOne = teams[Math.floor(teams.length * Math.random())];
        let playerTwo = teams[Math.floor(teams.length * Math.random())];
        while (playerOne === playerTwo) {
          playerTwo = teams[Math.floor(teams.length * Math.random())];
        }
        setPlayerOneTeam(playerOne);
        setPlayerTwoTeam(playerTwo);
        if (i >= 6) {
          clearInterval(drawingInterval);
          setShowStatsAndAddScoreButtons(true);
          const filteredTeams = teams.filter(
            (team) => team !== playerOne && team !== playerTwo
          );

          if (clubsClicked) {
            setClubs(filteredTeams);
            setTeams(filteredTeams);
            AsyncStorage.setItem("clubs", JSON.stringify(filteredTeams));
          }
          if (nationalTeamsClicked) {
            setNationalTeams(filteredTeams);
            setTeams(filteredTeams);
            AsyncStorage.setItem(
              "nationalTeams",
              JSON.stringify(filteredTeams)
            );
          }
        }
      }, 250);
    }
  };

  const handleAddScoreButtonClicked = async () => {
    if (user) {
      await firebase
        .auth()
        .currentUser.getIdToken(true)
        .then((accessToken) => {
          setAccessToken(accessToken);
        })
        .catch((err) => {
          setUser(null);
          Alert.alert("Log in to add the score.");
          return;
        });
      setShowAddScoreModal(true);
    } else {
      Alert.alert("Log in to add the score.");
    }
  };

  useEffect(() => {
    handleTopButtonClicked("Clubs")
  }, [])

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <UserIconButton />
      <AppTopModal
        isVisible={showSubmitResultConfirmation}
        setIsVisible={setShowSubmitResultConfirmation}
      >
        <Text style={{ color: "green", fontWeight: "bold", fontSize: 16 }}>
          Result successfully added to database!
        </Text>
      </AppTopModal>
      <View style={styles.container}>
        <NoMoreTeamsModal
          isVisible={showNoMoreTeamsModal}
          close={() => setShowNoMoreTeamsModal(false)}
        />
        <AddingGameScoreModal
          isVisible={showAddScoreModal}
          playerOneTeam={playerOneTeam}
          playerTwoTeam={playerTwoTeam}
          hideAddScoreButton={() => setShowStatsAndAddScoreButtons(false)}
          setShowSubmitResultConfirmation={setShowSubmitResultConfirmation}
        />
        <PregameStatsModal
          isVisible={showPregameStatsModal}
          playerOneTeam={playerOneTeam}
          playerTwoTeam={playerTwoTeam}
          close={() => setShowPregameStatsModal(false)}
        />
        <View style={styles.contentContainer}>
          <View style={styles.focusArea}>
            <View style={styles.topMenu}>
              <TouchableOpacity
                style={[
                  styles.topButton,
                  clubsClicked ? styles.topButtonClicked : null,
                ]}
                onPress={() => handleTopButtonClicked("Clubs")}
              >
                <Text>Clubs</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.topButton,
                  nationalTeamsClicked ? styles.topButtonClicked : null,
                ]}
                onPress={() => handleTopButtonClicked("NationalTeams")}
              >
                <Text>National Teams</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.teamsContainer}>
              <View style={styles.logoAndTeamName}>
                <Text style={styles.playerName}>Bojo</Text>
                <Image
                  source={ClubLogos[playerOneTeam]}
                  style={styles.clubLogo}
                />
                <Text style={styles.teamName}>{playerOneTeam}</Text>
              </View>
              <View style={styles.logoAndTeamName}>
                <Text style={styles.playerName}>Maciek</Text>
                <Image
                  source={ClubLogos[playerTwoTeam]}
                  style={styles.clubLogo}
                />
                <Text style={styles.teamName}>{playerTwoTeam}</Text>
              </View>
            </View>
            <View style={styles.bottomButtonsContainer}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 100,
                }}
              >
                {showStatsAndAddScoreButtons ? (
                  <FadeInView
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      height: 100,
                    }}
                  >
                    <AppButton
                      text="Check Pregame Stats"
                      buttonHeight={40}
                      buttonWidth="70%"
                      color="#fff"
                      fontColor="#FE0065"
                      fontSize={20}
                      clicked={() => {
                        if (user) {
                          setShowPregameStatsModal(true)
                        } else {
                          Alert.alert("Log in to check pregame stats.");
                        }
                      }}
                    />
                    <AppButton
                      text="Add the game score"
                      buttonHeight={40}
                      buttonWidth="70%"
                      color="#fff"
                      fontColor="#FE0065"
                      fontSize={20}
                      clicked={handleAddScoreButtonClicked}
                    />
                  </FadeInView>
                ) : (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        height: 100,
                        opacity: 0.3,
                      }}
                    >
                      <AppButton
                        text="Check Pregame Stats"
                        buttonHeight={40}
                        buttonWidth="70%"
                        color="#fff"
                        fontColor="#FE0065"
                        fontSize={20}
                      />
                      <AppButton
                        text="Add the game score"
                        buttonHeight={40}
                        buttonWidth="70%"
                        color="#fff"
                        fontColor="#FE0065"
                        fontSize={20}
                      />
                    </View>
                  )}
              </View>
              <AppButton
                text="DRAW TEAMS"
                buttonHeight={60}
                buttonWidth="80%"
                color="#FE0065"
                fontColor="#fff"
                fontSize={25}
                clicked={drawTeams}
              />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default DrawingTeams;