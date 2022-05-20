import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Images, Metrix, Colors } from "../config";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser, ResetErrorsState } from "../redux/User/user.actions";
import TextInputComp from "../components/TextInputComp";
import ButtonComp from "../components/ButtonComp";
import BackgroundComp from "../components/BackgroundComp";

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

  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // errors handeling
  const [fullnameErrors, setFullnameErrors] = useState("");
  const [emailErrors, setEmailErrors] = useState("");
  const [passwordErrors, setPasswordErrors] = useState("");

  useEffect(() => {
    if (errors) console.log("Errors, ", errors);
    if (propertySignUpSuccess) navigation.navigate("SliderPage1");
    return () => {
      setFullnameErrors("");
      setEmailErrors("");
      setPasswordErrors("");
      dispatch(ResetErrorsState());
    };
  }, [propertySignUpSuccess, errors]);

  const handleRegister = async (e) => {
    var checking_form = "true";
    if (fullname.length === 0) {
      setFullnameErrors("* First Name Field Required");
      checking_form = "false";
    } else {
      setFullnameErrors("");
    }
    if (email.length === 0 || email.indexOf("@") === -1) {
      setEmailErrors("* Email Field Required");
      checking_form = "false";
    } else {
      setEmailErrors("");
    }
    if (password.length < 6) {
      setPasswordErrors("* Password Field Required, 6 caracter min");
      checking_form = "false";
    } else {
      setPasswordErrors("");
    }
    if (checking_form === "true") {
      dispatch(signUpUser({ fullname, email, password }));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title1}>WELCOME</Text>
        <Text style={styles.title2}>SignUp to continue</Text>
        {(emailErrors.length > 0 ||
          passwordErrors.length > 0 ||
          fullnameErrors.length > 0 ||
          errors.length > 0) && (
          <View style={styles.errorContainer}>
            {errors.length > 0 && (
              <Text style={styles.fieldErrors}>{errors}</Text>
            )}
            {fullnameErrors.length > 0 && (
              <Text style={styles.fieldErrors}>{fullnameErrors}</Text>
            )}
            {emailErrors.length > 0 && (
              <Text style={styles.fieldErrors}>{emailErrors}</Text>
            )}
            {passwordErrors.length > 0 && (
              <Text style={styles.fieldErrors}>{passwordErrors}</Text>
            )}
          </View>
        )}
        <View style={styles.container2}>
          {/* <Image
            source={require("../assets/maleUser.png")}
            style={{ resizeMode: "contain", width: 80, height: 80 }}
          /> */}
          {/* fullName */}
          <TextInputComp
            placeholder="Full Name"
            isPassword={false}
            stateName={fullname}
            stateNameChange={setFullname}
            icon={
              <AntDesign
                name={"user"}
                size={Metrix.customFontSize(25)}
                color={Colors.white}
              />
            }
            inputStyle={
              fullnameErrors.length > 0 && {
                borderColor: "red",
                borderWidth: 1.5,
              }
            }
          />
          {/* Email */}
          <TextInputComp
            placeholder="Email"
            isPassword={false}
            stateName={email}
            stateNameChange={setEmail}
            icon={
              <Entypo
                name={"mail"}
                size={Metrix.customFontSize(25)}
                color={Colors.white}
              />
            }
            inputStyle={
              emailErrors.length > 0 && { borderColor: "red", borderWidth: 1.5 }
            }
          />
          {/* Password */}
          <TextInputComp
            placeholder="Password"
            isPassword={true}
            stateName={password}
            stateNameChange={setPassword}
            icon={
              <Fontisto
                name={"locked"}
                size={Metrix.customFontSize(25)}
                color={Colors.white}
              />
            }
            inputStyle={
              passwordErrors.length > 0 && {
                borderColor: "red",
                borderWidth: 1.5,
              }
            }
          />
          <ButtonComp
            bgColor="transparent"
            textStyle={{ fontSize: 12, textAlign: "center" }}
            txtColor={"#fff"}
            content="Already have an account? please Sign in"
            pressHandler={() => {
              navigation.navigate("Login");
            }}
          />
          <ButtonComp
            bgColor={Colors.button}
            txtColor={"#fff"}
            content="Sign Up"
            pressHandler={handleRegister}
          />
        </View>
        <BackgroundComp />
      </ScrollView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 50,
  },
  title1: {
    color: Colors.button,
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  title2: {
    color: Colors.white,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 50,
  },
  container2: {
    width: "80%",
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // errors
  errorContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
  },
  fieldErrors: {
    color: "red",
    fontSize: 10,
    marginVertical: 5,
  },
});
