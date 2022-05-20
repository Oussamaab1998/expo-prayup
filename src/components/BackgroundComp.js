import { StyleSheet, Dimensions, ImageBackground } from "react-native";
import { Images } from "../config";

const BackgroundComp = () => {
  return (
    <ImageBackground
      source={Images.background}
      style={[styles.fixed, styles.bgcontainter, { zIndex: -1 }]}
    />
  );
};

export default BackgroundComp;

const styles = StyleSheet.create({
  // bg
  bgContainter: {
    width: Dimensions.get("window").width, //for full screen
    height: Dimensions.get("window").height, //for full screen
  },
  fixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
