import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Video, AVPlaybackStatus } from "expo-av";
import Intro from "../assets/intro.mp4";
import { collection, getDocs, query, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/utils";
import { useSelector } from "react-redux";
// const StatusBarHeight = Platform.select({
//   ios: 20,
//   android: StatusBar.currentHeight,
//   default: 0,
// });

// const setUserLoggedIn = async () => {
//   const userId = auth.currentUser.uid;
//   try {
//     const q = query(collection(db, "users"));
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       console.log(doc.id, " => ", doc.data());
//       if (doc.id === userId) {
//         numberOfPrayers = doc.data().prayers;
//       }
//     });
//     await updateDoc(doc(db, "users", userId), {
//       isLoggedBefore: true,
//     });
//   } catch (err) {
//     console.log("Error from Add To Prayers Number action !!");
//     console.log(err);
//   }
// };
const mapState = ({ user }) => ({
  currentProperty: user.currentProperty,
});

const SliderPage1 = ({ navigation }) => {
  const { currentProperty } = useSelector(mapState);
  useEffect(() => {
    console.log("currentProperty =>", currentProperty);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => true
      );
      return () => backHandler.remove();
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor="#ffffff" barStyle="dark-content" /> */}
      <TouchableOpacity
        style={styles.nextBtn}
        onPress={() => {
          console.log("Next Pressed");
          // setUserLoggedIn();
          navigation.navigate("BottomTabs");
        }}
      >
        <Text style={styles.btnText}>Get Started</Text>
      </TouchableOpacity>

      <Video
        source={Intro}
        // paused={false}
        shouldPlay={true}
        isLooping={true}
        resizeMode="contain"
        style={styles.backgroundVideo}
      />
    </View>
  );
};

export default SliderPage1;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    top: "10%",
    left: 0,
    bottom: 0,
    right: 0,
    height: "85%",
    width: "100%",
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#DED9C1",
    paddingVertical: 0,
    position: "relative",
    alignItems: "center",
    // marginTop: StatusBarHeight,
  },
  sliderLine: {
    width: "70%",
    backgroundColor: "black",
    height: 1,
    marginLeft: "5%",
    position: "relative",
  },
  sliderProgressIndicator: {
    position: "absolute",
    width: "33.33333%",
    height: 3,
    backgroundColor: "black",
    top: -1.5,
    left: "0%",
  },
  textWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 3,
  },
  textStyle: {
    fontSize: 26,
    color: "black",
    fontWeight: "600",
  },
  brandText: {
    fontWeight: "900",
  },
  btmTextWrapper: {
    marginTop: 4,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 2,
  },
  txtStyle: {
    color: "black",
    fontSize: 22,

    textAlign: "center",
  },
  ImageBg: {},
  btnWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  nextBtn: {
    backgroundColor: "#BE9553",
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#BE9553",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,

    elevation: 7,
    borderRadius: 16,
    marginTop: 15,
  },
  btnText: {
    color: "#fff",

    fontWeight: "600",
    fontSize: 20,
  },
  skipBtnText: {
    color: "#000",

    fontSize: 18,
  },
  skipBtnWrapper: {
    position: "absolute",
    height: 50,
    width: "100%",
    // width: '10%',
    right: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  skipBtn: {},
});
