import React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Images, Metrix, Colors, NavigationService } from "../config";

const StartUpScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={Images.background}
        resizeMode="cover"
        style={styles.image}
      >
        <Image
          source={Images.Logo}
          style={{
            resizeMode: "contain",
            width: Metrix.HorizontalSize(228),
            height: Metrix.VerticalSize(247),
          }}
        />
        <TouchableOpacity
          onPress={() => NavigationService.navigate("SignUp")}
          style={{
            bottom: 180,
            backgroundColor: Colors.button,
            ...styles.button,
          }}
        >
          <Text
            style={{ color: Colors.white, fontSize: Metrix.customFontSize(18) }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => NavigationService.navigate("Login")}
          style={{
            bottom: 110,
            backgroundColor: Colors.white,
            ...styles.button,
          }}
        >
          <Text
            style={{ color: Colors.black, fontSize: Metrix.customFontSize(19) }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 20,
    width: Metrix.HorizontalSize(150),
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 40,
    paddingVertical: 10,
    position: "absolute",
  },
});
export default StartUpScreen;
