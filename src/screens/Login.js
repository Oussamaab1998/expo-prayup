import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Images, Metrix, Colors, NavigationService } from "../config";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../redux/User/user.actions";

const mapState = ({ user }) => ({
  currentProperty: user.currentProperty,
  propertySignInSuccess: user.propertySignInSuccess,
  errors: user.errors,
  isAdmin: user.isAdmin,
});
const Login = ({ navigation }) => {
  const { currentProperty, propertySignInSuccess, errors, isAdmin } =
    useSelector(mapState);
  const dispatch = useDispatch();

  const [email, setUsername] = useState("prayupuser@gmail.com"); //realadmin1@gmail.com
  const [password, setPassword] = useState("123123");
  // const [checking_form, setChecking_form] = useState(true);

  useEffect(() => {
    if (propertySignInSuccess && currentProperty) {
      if (isAdmin) {
        console.log(isAdmin);
        navigation.navigate("BottomTabs");
      } else {
        console.log(isAdmin);
        // navigation.navigate("SliderPage1");
        navigation.navigate("BottomTabs");
      }
    } else if (errors.length > 0) {
      console.log("Errors => ", errors);
    }
  }, [errors, propertySignInSuccess]);

  const handleLogin = async (e) => {
    var checking_form = "true";
    if (password.length < 6) {
      console.log("* Password Field Required, 6 caracter min", password);
      Alert.alert("* Password Field Required, 6 caracter min", password);
      checking_form = "false";
    } else {
      console.log("Nice as well");
      console.log(
        "* Password Field Required, 6 caracter min",
        email,
        "why not there",
        password
      );
    }
    if (checking_form === "true") {
      dispatch(signInUser({ email, password }));
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={Images.background}
        resizeMode="cover"
        style={styles.image}
      >
        <StatusBar style="light" hidden={false} />
        <Text style={styles.title}>WELCOME</Text>
        <Text style={styles.title2}>Login to continue</Text>
        <View style={styles.container2}>
          <Image
            source={Images.user}
            style={{ resizeMode: "contain", width: 90, height: 90 }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 30,
            }}
          >
            <View style={styles.inputView}>
              <AntDesign
                name={"user"}
                size={Metrix.customFontSize(25)}
                color={Colors.white}
              />
            </View>
            <TextInput
              placeholder={"Username"}
              placeholderTextColor={Colors.lighGray}
              onChangeText={(text) => setUsername(text)}
              value={email}
              style={styles.input}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              marginBottom: 5,
            }}
          >
            <View style={styles.inputView}>
              <Fontisto
                name={"locked"}
                size={Metrix.customFontSize(25)}
                color={Colors.white}
              />
            </View>
            <TextInput
              secureTextEntry={true}
              placeholder={"Password"}
              placeholderTextColor={Colors.lighGray}
              onChangeText={(text) => setPassword(text)}
              value={password}
              style={styles.input}
            />
          </View>
          <View style={{ width: "100%" }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
              style={{
                alignSelf: "flex-end",
                marginRight: 10,
              }}
            >
              <Text
                style={{
                  color: Colors.white,
                }}
              >
                Don't have an account yet
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20, marginBottom: 10 }}>
            <TouchableOpacity
              style={{
                // bottom: 110,
                backgroundColor: Colors.button,
                ...styles.button,
              }}
              onPress={handleLogin}
            >
              <Text
                style={{
                  color: Colors.white,
                  fontSize: Metrix.customFontSize(19),
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 18,
              color: "#c35c1f",
              textAlign: "center",
              marginTop: 10,
            }}
          >
            {errors[0]}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    // height: "100%",
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
    // position: 'absolute',
  },
  socialButton: {
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: '#fff',
    paddingHorizontal: Metrix.HorizontalSize(30),
    paddingVertical: Metrix.VerticalSize(3),
  },
  title: {
    color: Colors.button,
    fontSize: Metrix.customFontSize(50),
    fontWeight: "bold",
  },
  title2: {
    color: Colors.white,
    fontSize: Metrix.customFontSize(18),
    fontWeight: "bold",
  },
  container2: {
    borderWidth: 10,
    borderColor: Colors.button,
    // height: Metrix.VerticalSize(510),
    width: Metrix.HorizontalSize(300),
    borderRadius: 50,
    marginVertical: 20,
    padding: 20,
    alignItems: "center",
    // justifyContent: 'center',
    backgroundColor: "#28115B",
  },
  input: {
    backgroundColor: Colors.white,
    width: Metrix.HorizontalSize(170),
    paddingVertical: 10,
    paddingLeft: 8,
    height: Metrix.VerticalSize(44),
  },
  inputView: {
    backgroundColor: Colors.button,
    width: Metrix.HorizontalSize(45),
    paddingVertical: 7,
    alignItems: "center",
    justifyContent: "center",
    // height: Metrix.VerticalSize(56)
  },
});
export default Login;
