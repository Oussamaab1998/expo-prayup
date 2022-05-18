import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Images, Metrix, Colors } from "../config";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../redux/User/user.actions";

const mapState = ({ user }) => ({
  currentProperty: user.currentProperty,
  propertySignUpSuccess: user.propertySignUpSuccess,
  errors: user.errors,
});

const SignUp = ({ navigation }) => {
  console.log("Property Register Screen");
  const { currentProperty, propertySignUpSuccess, errors } =
    useSelector(mapState);
  const dispatch = useDispatch();

  const [firstName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (propertySignUpSuccess) {
      navigation.navigate("SliderPage1");
    }
  }, [propertySignUpSuccess]);

  const handleRegister = async (e) => {
    var checking_form = "true";
    if (checking_form === "true") {
      dispatch(signUpUser({ firstName, email, password }));
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
        <Text style={styles.title2}>SignUp to continue</Text>
        <View style={styles.container2}>
          <Image
            source={require("../assets/maleUser.png")}
            style={{ resizeMode: "contain", width: 80, height: 80 }}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
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
              placeholder={"Full Name"}
              placeholderTextColor={Colors.lighGray}
              onChangeText={(text) => setFullname(text)}
              value={fullname}
              style={styles.input}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <View style={styles.inputView}>
              <Entypo
                name={"mail"}
                size={Metrix.customFontSize(25)}
                color={Colors.white}
              />
            </View>
            <TextInput
              placeholder={"Email"}
              placeholderTextColor={Colors.lighGray}
              onChangeText={(text) => setEmail(text)}
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
                navigation.navigate("Login");
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
                Already have an account ?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20, marginBottom: 10 }}>
            <TouchableOpacity
              onPress={handleRegister}
              style={{
                // bottom: 110,
                backgroundColor: Colors.button,
                ...styles.button,
              }}
            >
              <Text
                style={{
                  color: Colors.white,
                  fontSize: Metrix.customFontSize(19),
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
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
export default SignUp;
