import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import BackgroundComp from "../components/BackgroundComp";
import ButtonComp from "../components/ButtonComp";
import { Images, Metrix, Colors, NavigationService } from "../config";

const StartUpScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Image
          source={Images.Logo}
          style={styles.logoStyle}
          resizeMode="contain"
        />
        <View style={styles.btnContainer}>
          <ButtonComp
            bgColor={Colors.button}
            txtColor={"#fff"}
            content="Sign Up"
            pressHandler={() => NavigationService.navigate("SignUp")}
          />
          <ButtonComp
            bgColor={"#fff"}
            txtColor={"#000"}
            content="Login"
            pressHandler={() => NavigationService.navigate("Login")}
          />
        </View>
      </View>
      <BackgroundComp />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 50,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoStyle: {
    width: "50%",
    height: "50%",
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
});
export default StartUpScreen;
