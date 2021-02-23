import React, { useContext, useState, useEffect } from "react";
import { Text, Alert } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import AppButton from "../UI/AppButton";
import AppModal from "../UI/AppModal";
import { TextInput } from "react-native-gesture-handler";
import { AppContext } from "../hooks/Contexts";

const LoginMenu = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const {
    showLoginMenuModal,
    setShowLoginMenuModal,
    createUserWithEmailAndPassword,
    logInWithEmail,
    logInWithFacebook,
    user,
    logOut,
    deleteCurrentUser
  } = useContext(AppContext);

  const handleCreateUserClicked = async () => {
    if (username && password) {
      await createUserWithEmailAndPassword(username, password);
      setShowLoginMenuModal(false);
    } else {
      Alert.alert("Please enter both e-mail and password!");
    }
  };

  const handleLoginClicked = async () => {
    if (username && password) {
      await logInWithEmail(username, password);
      setShowLoginMenuModal(false);
    } else {
      Alert.alert("Please enter both e-mail and password!");
    }
  };

  const handleFacebookLoginClicked = () => {
    logInWithFacebook();
    setTimeout(() => setShowLoginMenuModal(false), 1000);
  };

  useEffect(() => {
    if (!user) {
      setUsername(null);
      setPassword(null);
    }
  }, [user]);

  return (
    <AppModal
      isVisible={showLoginMenuModal}
      pressedOutside={() => setShowLoginMenuModal(false)}
    >
      {user ? (
        <>
          <AppButton
            text="DELETE ACCOUNT"
            buttonHeight={40}
            buttonWidth="80%"
            color="#FE0065"
            fontColor="#fff"
            clicked={() => {
              setTimeout(() => deleteCurrentUser(), 600);
              setShowLoginMenuModal(false);
            }}
          />
          <AppButton
            text="LOG OUT"
            buttonHeight={40}
            buttonWidth="80%"
            color="#FE0065"
            fontColor="#fff"
            clicked={() => {
              setTimeout(() => logOut(), 600);
              setShowLoginMenuModal(false);
            }}
          />
          <Text
            onPress={() => setShowLoginMenuModal(false)}
            style={styles.loginAsGuest}
          >
            CANCEL
          </Text>
        </>
      ) : (
          <>
            <Text style={{ marginTop: 10 }}>Username:</Text>
            <TextInput
              onChangeText={(text) => setUsername(text)}
              style={styles.modalTextInput}
            />
            <Text>Password:</Text>
            <TextInput
              onChangeText={(text) => setPassword(text)}
              style={styles.modalTextInput}
              secureTextEntry={true}
            />
            <AppButton
              text="LOG IN"
              buttonHeight={40}
              buttonWidth="80%"
              color="#FE0065"
              fontColor="#fff"
              clicked={handleLoginClicked}
            />
            <AppButton
              text="CREATE ACCOUNT"
              buttonHeight={40}
              buttonWidth="80%"
              color="#FE0065"
              fontColor="#fff"
              clicked={handleCreateUserClicked}
            />
            <Text>or</Text>
            <AppButton
              text="LOG IN WITH FACEBOOK"
              buttonHeight={40}
              buttonWidth="80%"
              color="#0080F7"
              fontColor="#fff"
              clicked={handleFacebookLoginClicked}
            />
            <Text
              onPress={() => setShowLoginMenuModal(false)}
              style={styles.loginAsGuest}
            >
              CANCEL
          </Text>
          </>
        )}
    </AppModal>
  );
};

const styles = EStyleSheet.create({
  modalTextInput: {
    width: "80%",
    borderBottomWidth: 2,
    borderBottomColor: "#FE0065",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 6,
  },
  loginAsGuest: {
    color: "#FE0065",
    marginBottom: 10,
    fontSize: 16,
  },
});

export default LoginMenu;
