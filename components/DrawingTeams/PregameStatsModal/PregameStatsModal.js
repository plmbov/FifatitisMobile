import React, { useContext, useEffect, useState } from "react";
import { Text, Button, View, StyleSheet, Image } from "react-native";
import { AppContext } from "../../../hooks/Contexts";
import AppButton from "../../../UI/AppButton";
import AppModal from "../../../UI/AppModal";
import Alisson from "../../../assets/alisson.png";
import Ozil from "../../../assets/ozil.png";

const PregameStatsModal = (props) => {
  const [playerOneStats, setPlayerOneStats] = useState(0);
  const [playerTwoStats, setPlayerTwoStats] = useState(0);
  const [showLoader, setShowLoader] = useState(true);

  const { accessToken } = useContext(AppContext);

  useEffect(() => {
    if (props.isVisible) {
      setShowLoader(true)
    }
    fetch("https://fifatitis.firebaseio.com/results.json?auth=" + accessToken)
      .then((res) => res.json())
      .then((data) => {
        const allGameScores = mapObjectToCollection(data);
        let playerOneWins = 0;
        let playerOneLosses = 0;
        let playerOneDirectGamesWins = 0;
        let playerTwoWins = 0;
        let playerTwoLosses = 0;
        let playerTwoDirectGamesWins = 0;

        allGameScores.map((yearGameScores) => {
          for (const [month, games] of Object.entries(yearGameScores)) {
            for (const [key, game] of Object.entries(games)) {
              if (game.playerOneTeam === props.playerOneTeam) {
                if (game.winner === "Bojo") {
                  playerOneWins++;
                  if (game.playerTwoTeam === props.playerTwoTeam) {
                    playerOneDirectGamesWins++;
                  }
                } else {
                  playerOneLosses++;
                }
              }
              if (game.playerTwoTeam === props.playerTwoTeam) {
                if (game.winner === "Maciek") {
                  playerTwoWins++;
                  if (game.playerOneTeam === props.playerOneTeam) {
                    playerTwoDirectGamesWins++;
                  }
                } else {
                  playerTwoLosses++;
                }
              }
            }
          }
        });

        setPlayerOneStats({
          wins: playerOneWins,
          losses: playerOneLosses,
          directGamesWins: playerOneDirectGamesWins,
        });
        setPlayerTwoStats({
          wins: playerTwoWins,
          losses: playerTwoLosses,
          directGamesWins: playerTwoDirectGamesWins,
        });
      });
    setTimeout(() => setShowLoader(false), 500);
  }, [props.isVisible]);

  const mapObjectToCollection = (object) => {
    const collection = [];
    for (let key in object) {
      collection.push({
        ...object[key],
      });
    }
    return collection;
  };

  return (
    <AppModal
      isVisible={props.isVisible}
      modalHeight={400}
      pressedOutside={props.close}
    >
      {showLoader ?
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
        :
        <View style={styles.container}>
          <View style={styles.statsContainer}>
            <View style={styles.singlePlayerContainer}>
              <Image source={Alisson} style={styles.photo} />
              <Text style={styles.playerName}>Bojo</Text>
              <Text style={styles.asText}>as</Text>
              <Text style={styles.teamName}>{props.playerOneTeam}</Text>
              <Text style={styles.counter}>Wins: {playerOneStats.wins}</Text>
              <Text style={styles.counter}>Losses: {playerOneStats.losses}</Text>
            </View>
            <View style={styles.singlePlayerContainer}>
              <Image source={Ozil} style={styles.photo} />
              <Text style={styles.playerName}>Maciek</Text>
              <Text style={styles.asText}>as</Text>
              <Text style={styles.teamName}>{props.playerTwoTeam}</Text>
              <Text style={styles.counter}>Wins: {playerTwoStats.wins}</Text>
              <Text style={styles.counter}>Losses: {playerTwoStats.losses}</Text>
            </View>
          </View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Direct Games Wins</Text>
          <View style={styles.directGamesContainer}>
            <Text style={styles.counter}>{playerOneStats.directGamesWins}</Text>
            <Text style={styles.counter}>{playerTwoStats.directGamesWins}</Text>
          </View>
        </View>}
      <AppButton
        text="CLOSE"
        buttonHeight={40}
        buttonWidth="80%"
        color="#FE0065"
        fontColor="#fff"
        clicked={props.close}
      />
    </AppModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    height: "100%",
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
  },
  singlePlayerContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "50%",
  },
  photo: {
    height: 120,
    width: 100,
  },
  playerName: {
    fontSize: 20,
    fontWeight: "bold"
  },
  teamName: {
    fontSize: 16,
    fontWeight: "bold"
  },
  counter: {
    marginTop: 10,
  },
  directGamesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
  },
});

export default PregameStatsModal;
