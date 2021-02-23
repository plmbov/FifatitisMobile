import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import EStyleSheet from "react-native-extended-stylesheet";
import { AppContext } from "./hooks/Contexts";
import firebase from "firebase";
import { firebaseConfig } from "./controlers/firebaseConfig";
import * as Facebook from "expo-facebook";
import { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET_KEY } from "./controlers/uid";
import HomeScreen from "./components/HomeScreen";
import DrawingTeams from "./components/DrawingTeams/DrawingTeams";
import AddingGameScore from "./components/AddingGameScore/AddingGameScore";
import BrowsingStats from "./components/BrowsingStats/BrowsingStats";
import { Alert } from "react-native";

const Stack = createStackNavigator();

export default function App() {
  const [showLoginMenuModal, setShowLoginMenuModal] = useState(false);
  const [showAddScoreModal, setShowAddScoreModal] = useState(false);
  const [showLoginResult, setShowLoginResult] = useState(false);
  const [user, setUser] = useState(false);
  const [userDeleted, setUserDeleted] = useState(false);
  const [facebookName, setFacebookName] = useState("");
  const [facebookPhotoURL, setFacebookPhotoURL] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [allAvailableTeams, setAllAvailableTeams] = useState([]);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const createUserWithEmailAndPassword = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        setUser(JSON.stringify(res));
        setTimeout(() => setShowLoginResult(true), 1000)
      })
      .catch((err) => {
        setShowLoginResult(true);
      });
  };

  const logInWithEmail = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        setUser(JSON.stringify(res));
        setTimeout(() => setShowLoginResult(true), 1000)
      })
      .catch((err) => {
        setShowLoginResult(true);
      });
  };

  async function logInWithFacebook() {
    try {
      await Facebook.initializeAsync(FACEBOOK_APP_ID);
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        fetch(`https://graph.facebook.com/me?access_token=${token}`)
          .then((res) => res.json())
          .then((data) => setFacebookName(data.name.split(" ")[0]));
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        firebase.auth().signInWithCredential(credential);
        setTimeout(() => setShowLoginResult(true), 1000)
      }
    } catch ({ message }) {
      alert(`Due to COVID Facebook is not verifing non-commercial projects. Therefore currently it is not possible to log in with Facebook account. Sorry! <br><br> Error: ${message}`);
    }
  }

  const logOut = () => {
    firebase.auth().signOut();
    setUser(null);
    setFacebookPhotoURL("")
    setFacebookName(null)
    setAccessToken(null);
  };

  const deleteCurrentUser = () => {
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${firebaseConfig.apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: `{"idToken":"${accessToken}"}`,
      }
    )
      .then(() => {
        setUser(null)
        setUserDeleted(true)
        setShowLoginResult(true);
        setUser(null);
        setFacebookPhotoURL("")
        setFacebookName(null)
        setAccessToken(null);
        setTimeout(() => setUserDeleted(false), 4000)
      })
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        setUser(user);
        if (user.photoURL) {
          setFacebookName(user.displayName.split(" ")[0])
          setFacebookPhotoURL(user.photoURL + `?access_token=${FACEBOOK_APP_ID}|${FACEBOOK_APP_SECRET_KEY}`)
        }
      }
    })
  }, []);

  useEffect(() => {
    if (user) {
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then((accessToken) => {
          setAccessToken(accessToken);
        })
        .catch((err) => setUser(null));
    }
  }, [user]);


  return (
    <AppContext.Provider
      value={{
        showLoginMenuModal,
        setShowLoginMenuModal,
        showLoginResult,
        setShowLoginResult,
        showAddScoreModal,
        setShowAddScoreModal,
        user,
        setUser,
        userDeleted,
        facebookName,
        facebookPhotoURL,
        createUserWithEmailAndPassword,
        logInWithEmail,
        logInWithFacebook,
        logOut,
        deleteCurrentUser,
        accessToken,
        setAccessToken,
        allAvailableTeams,
        setAllAvailableTeams
      }}
    >
      <NavigationContainer>
        <Stack.Navigator mode="modal" headerMode="none">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="DrawingTeams" component={DrawingTeams} />
          <Stack.Screen name="AddingGameScore" component={AddingGameScore} />
          <Stack.Screen name="BrowsingStats" component={BrowsingStats} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

EStyleSheet.build();
