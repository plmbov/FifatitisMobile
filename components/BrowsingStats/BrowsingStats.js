import React, { useState, useEffect, useContext } from "react";
import { View, Text, ImageBackground, Image } from "react-native";
import { dropDownPickerData } from "./dropDownPickerData";
import DropDownPicker from "react-native-dropdown-picker";
import backgroundImage from "../../assets/test2.png";
import styles from "./styles";
import Logo from "../Logo";
import Alisson from "../../assets/alisson.png";
import Ozil from "../../assets/ozil.png";
import { AppContext } from "../../hooks/Contexts";
import UserIconButton from "../../UI/UserIconButton";

const BrowsingStats = () => {

  const [playerOneStats, setPlayerOneStats] = useState(0);
  const [playerTwoStats, setPlayerTwoStats] = useState(0);
  const [dataFetched, setDataFetched] = useState(false);
  const [statsToShow, setStatsToShow] = useState("Today")

  const { accessToken, user } = useContext(AppContext);

  useEffect(() => {
    fetch("https://fifatitis.firebaseio.com/results.json?auth=" + accessToken)
      .then((res) => res.json())
      .then((data) => {
        const d = new Date()
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
        const currentYear = currentDateFormatted.substr(6, 4)
        const currentMonth = currentDateFormatted.substr(3, 2)
        const lastMonth = ("0" + (parseInt(currentMonth) - 1)).slice(-2)
        const currentDay = currentDateFormatted.substr(0, 2)
        const currentHour = currentDateFormatted.substr(11, 2)

        const allGameScores = mapObjectToCollection(data);

        let allTimePlayerOneWins = 0;
        let allTimePlayerOneGoals = 0;
        let allTimePlayerTwoWins = 0;
        let allTimePlayerTwoGoals = 0;

        let thisYearPlayerOneWins = 0;
        let thisYearPlayerOneGoals = 0;
        let thisYearPlayerTwoWins = 0;
        let thisYearPlayerTwoGoals = 0;

        let thisMonthPlayerOneWins = 0;
        let thisMonthPlayerOneGoals = 0;
        let thisMonthPlayerTwoWins = 0;
        let thisMonthPlayerTwoGoals = 0;

        let lastMonthPlayerOneWins = 0;
        let lastMonthPlayerOneGoals = 0;
        let lastMonthPlayerTwoWins = 0;
        let lastMonthPlayerTwoGoals = 0;

        let todayPlayerOneWins = 0;
        let todayPlayerOneGoals = 0;
        let todayPlayerTwoWins = 0;
        let todayPlayerTwoGoals = 0;

        allGameScores.map((yearGameScores) => {
          for (const [month, games] of Object.entries(yearGameScores)) {
            for (const [key, game] of Object.entries(games)) {
              if (game.winner === "Bojo") {
                allTimePlayerOneWins++;
                if (game.dateAndTime.substr(6, 4) === currentYear) {
                  thisYearPlayerOneWins++;
                  if (month.toString() === currentMonth) {
                    thisMonthPlayerOneWins++
                    if (game.dateAndTime.substr(0, 2) === currentDay) {
                      todayPlayerOneWins++
                    }
                  }
                }
                if (game.dateAndTime.substr(6, 4) === currentYear && month.toString() === lastMonth) {
                  lastMonthPlayerOneWins++
                }
                if (currentMonth === "01" && month.toString() === "12" && game.dateAndTime.substr(6, 4) === (currentYear - 1).toString()) {
                  lastMonthPlayerOneWins++
                }
              }
              if (game.winner === "Maciek") {
                allTimePlayerTwoWins++;
                if (game.dateAndTime.substr(6, 4) === currentYear) {
                  thisYearPlayerTwoWins++;
                  if (month.toString() === currentMonth) {
                    thisMonthPlayerTwoWins++
                    if (game.dateAndTime.substr(0, 2) === currentDay) {
                      todayPlayerTwoWins++
                    }
                  }
                }
                if (game.dateAndTime.substr(6, 4) === currentYear && month.toString() === lastMonth) {
                  lastMonthPlayerTwoWins++
                }
                if (currentMonth === "01" && month.toString() === "12" && game.dateAndTime.substr(6, 4) === (currentYear - 1).toString()) {
                  lastMonthPlayerTwoWins++
                }
              }
              allTimePlayerOneGoals = allTimePlayerOneGoals + parseInt(game.Bojo)
              allTimePlayerTwoGoals = allTimePlayerTwoGoals + parseInt(game.Maciek)
              if (game.dateAndTime.substr(6, 4) === currentYear) {
                thisYearPlayerOneGoals = thisYearPlayerOneGoals + parseInt(game.Bojo)
                thisYearPlayerTwoGoals = thisYearPlayerTwoGoals + parseInt(game.Maciek)
                if (month.toString() === currentMonth) {
                  thisMonthPlayerOneGoals = thisMonthPlayerOneGoals + parseInt(game.Bojo)
                  thisMonthPlayerTwoGoals = thisMonthPlayerTwoGoals + parseInt(game.Maciek)
                  if (game.dateAndTime.substr(0, 2) === currentDay) {
                    todayPlayerOneGoals = todayPlayerOneGoals + parseInt(game.Bojo)
                    todayPlayerTwoGoals = todayPlayerTwoGoals + parseInt(game.Maciek)
                  }
                }
              }
              if (game.dateAndTime.substr(6, 4) === currentYear && month.toString() === lastMonth) {
                lastMonthPlayerOneGoals = lastMonthPlayerOneGoals + parseInt(game.Bojo)
                lastMonthPlayerTwoGoals = lastMonthPlayerTwoGoals + parseInt(game.Maciek)
              }
              if (currentMonth === "01" && month.toString() === "12" && game.dateAndTime.substr(6, 4) === (currentYear - 1).toString()) {
                lastMonthPlayerOneGoals = lastMonthPlayerOneGoals + parseInt(game.Bojo)
                lastMonthPlayerTwoGoals = lastMonthPlayerTwoGoals + parseInt(game.Maciek)
              }
            }
          }
        });

        setPlayerOneStats({
          allTime: {
            wins: allTimePlayerOneWins,
            goals: allTimePlayerOneGoals
          },
          thisYear: {
            wins: thisYearPlayerOneWins,
            goals: thisYearPlayerOneGoals
          },
          lastMonth: {
            wins: lastMonthPlayerOneWins,
            goals: lastMonthPlayerOneGoals
          },
          thisMonth: {
            wins: thisMonthPlayerOneWins,
            goals: thisMonthPlayerOneGoals
          },
          today: {
            wins: todayPlayerOneWins,
            goals: todayPlayerOneGoals
          },
        });
        setPlayerTwoStats({
          allTime: {
            wins: allTimePlayerTwoWins,
            goals: allTimePlayerTwoGoals
          },
          thisYear: {
            wins: thisYearPlayerTwoWins,
            goals: thisYearPlayerTwoGoals
          },
          lastMonth: {
            wins: lastMonthPlayerTwoWins,
            goals: lastMonthPlayerTwoGoals
          },
          thisMonth: {
            wins: thisMonthPlayerTwoWins,
            goals: thisMonthPlayerTwoGoals
          },
          today: {
            wins: todayPlayerTwoWins,
            goals: todayPlayerTwoGoals
          },
        });
        setDataFetched(true)
      });
  }, [accessToken]);

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
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <UserIconButton />
      <View style={styles.container}>
        <DropDownPicker
          items={dropDownPickerData}
          defaultValue={"Today"}
          containerStyle={{
            height: 50,
            width: "70%",
          }}
          style={{ backgroundColor: "rgba(250, 250, 250, 0.95)", borderColor: "transparent", borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
          labelStyle={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
          arrowColor={"#FE0065"}
          arrowSize={30}
          itemStyle={{ justifyContent: "center" }}
          dropDownStyle={{ backgroundColor: "rgba(250, 250, 250, 0.9)", borderColor: "transparent", borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
          onChangeItem={(item) => setStatsToShow(item.value)}
        />
        {dataFetched ?
          <View style={styles.statsContainer}>
            <View style={styles.singlePlayerContainer}>
              <Text style={styles.playerName}>Bojo</Text>
              <Image source={Alisson} style={styles.photo} />
              <Text style={styles.wins}>Wins:</Text>
              {statsToShow === "All time" ? <Text style={styles.winsNumber}>{playerOneStats.allTime.wins}</Text> : null}
              {statsToShow === "This year" ? <Text style={styles.winsNumber}>{playerOneStats.thisYear.wins}</Text> : null}
              {statsToShow === "Last month" ? <Text style={styles.winsNumber}>{playerOneStats.lastMonth.wins}</Text> : null}
              {statsToShow === "This month" ? <Text style={styles.winsNumber}>{playerOneStats.thisMonth.wins}</Text> : null}
              {statsToShow === "Today" ? <Text style={styles.winsNumber}>{playerOneStats.today.wins}</Text> : null}
              <Text style={styles.goals}>Goals scored: </Text>
              {statsToShow === "All time" ? <Text style={styles.goalsNumber}>{playerOneStats.allTime.goals}</Text> : null}
              {statsToShow === "This year" ? <Text style={styles.goalsNumber}>{playerOneStats.thisYear.goals}</Text> : null}
              {statsToShow === "Last month" ? <Text style={styles.goalsNumber}>{playerOneStats.lastMonth.goals}</Text> : null}
              {statsToShow === "This month" ? <Text style={styles.goalsNumber}>{playerOneStats.thisMonth.goals}</Text> : null}
              {statsToShow === "Today" ? <Text style={styles.goalsNumber}>{playerOneStats.today.goals}</Text> : null}
            </View>
            <View style={styles.singlePlayerContainer}>
              <Text style={styles.playerName}>Maciek</Text>
              <Image source={Ozil} style={styles.photo} />
              <Text style={styles.wins}>Wins: </Text>
              {statsToShow === "All time" ? <Text style={styles.winsNumber}>{playerTwoStats.allTime.wins}</Text> : null}
              {statsToShow === "This year" ? <Text style={styles.winsNumber}>{playerTwoStats.thisYear.wins}</Text> : null}
              {statsToShow === "Last month" ? <Text style={styles.winsNumber}>{playerTwoStats.lastMonth.wins}</Text> : null}
              {statsToShow === "This month" ? <Text style={styles.winsNumber}>{playerTwoStats.thisMonth.wins}</Text> : null}
              {statsToShow === "Today" ? <Text style={styles.winsNumber}>{playerTwoStats.today.wins}</Text> : null}
              <Text style={styles.goals}>Goals scored: </Text>
              {statsToShow === "All time" ? <Text style={styles.goalsNumber}>{playerTwoStats.allTime.goals}</Text> : null}
              {statsToShow === "This year" ? <Text style={styles.goalsNumber}>{playerTwoStats.thisYear.goals}</Text> : null}
              {statsToShow === "Last month" ? <Text style={styles.goalsNumber}>{playerTwoStats.lastMonth.goals}</Text> : null}
              {statsToShow === "This month" ? <Text style={styles.goalsNumber}>{playerTwoStats.thisMonth.goals}</Text> : null}
              {statsToShow === "Today" ? <Text style={styles.goalsNumber}>{playerTwoStats.today.goals}</Text> : null}
            </View>
          </View>
          :
          <View style={styles.loaderContainer}>
            <Text style={{ marginTop: 40, color: "#fff", fontSize: 20, fontWeight: "bold" }}>{user ? "Loading..." : "Log in to see the scores"}</Text>
          </View>
        }
      </View>
    </ImageBackground>
  );
};

export default BrowsingStats;