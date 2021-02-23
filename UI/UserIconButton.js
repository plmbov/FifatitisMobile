import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faUserCheck,
  faUserTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../hooks/Contexts";
import AppTopModal from "./AppTopModal";

const UserIconButton = () => {
  const {
    user,
    userDeleted,
    facebookName,
    facebookPhotoURL,
    setShowLoginMenuModal,
    showLoginResult,
    setShowLoginResult,
  } = useContext(AppContext);

  const styles = EStyleSheet.create({
    userIcon: {
      position: "absolute",
      top: 45,
      right: 20,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(250, 250, 250, 0.5)",
      borderRadius: 50,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20
    },
    username: {
      marginRight: 8,
    },
    topModalContainer: {
      width: "100%",
      justifyContent: "space-evenly",
      alignItems: "center",
      flexDirection: "row",
    },
    facebookPhoto: {
      height: 40,
      width: 40,
      borderRadius: 40
    }
  });

  return (
    <>
      <AppTopModal
        isVisible={showLoginResult}
        setIsVisible={setShowLoginResult}
      >
        {user ? (
          <View style={styles.topModalContainer}>
            <FontAwesomeIcon icon={faUserCheck} size={30} />
            <Text style={{ color: "green", fontWeight: "bold", fontSize: 16 }}>
              Hi{facebookName ? `, ${facebookName}` : null}! Enjoy the app!
            </Text>
          </View>
        ) : (
            (<View style={styles.topModalContainer}>
              <FontAwesomeIcon icon={faUserTimes} size={40} />
              {userDeleted ?

                <Text
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: 16,
                    width: "80%",
                    textAlign: "center"
                  }}
                >
                  Your account has been deleted. {"\n"} We will miss you!
                          </Text>
                :
                <Text
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: 16,
                    width: "80%",
                    textAlign: "center"
                  }}
                >
                  Logging in was unsuccessful. {"\n"} Please try again!
            </Text>
              }
            </View>)
          )}
      </AppTopModal>
      <TouchableOpacity
        style={styles.userIcon}
        onPress={() => setShowLoginMenuModal(true)}
      >
        <Text style={styles.username}>
          {user ? (facebookName ? facebookName : user.email) : "Guest"}
        </Text>
        {facebookPhotoURL ?
          <Image
            style={styles.facebookPhoto}
            source={{ uri: facebookPhotoURL }}
          />
          :
          <FontAwesomeIcon icon={faUser} size={40} />
        }
      </TouchableOpacity>
    </>
  );
};

export default UserIconButton;
