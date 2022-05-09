import React, { useEffect } from "react";
import { ActivityIndicator, Dimensions, View } from "react-native";
import { Colors, Metrix } from "../config";
let { height, width } = Dimensions.get("window");

const Loader = () => {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: height * 0.07,
          width: height * 0.07,
          backgroundColor: Colors.themeBlue,
          justifyContent: "center",
          borderRadius: Metrix.customFontSize(12),
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </View>
  );
};

export default Loader;
