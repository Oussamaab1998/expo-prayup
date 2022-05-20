import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Images, Metrix, Colors, NavigationService } from "../config";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useDispatch, useSelector } from "react-redux";
import { ResetErrorsState, signInUser } from "../redux/User/user.actions";
import BackgroundComp from "../components/BackgroundComp";
import TextInputComp from "../components/TextInputComp";
import ButtonComp from "../components/ButtonComp";

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

  const [email, setUsername] = useState("ramy@gmail.com"); //realadmin1@gmail.com
  const [password, setPassword] = useState("hellodude"); // 123123
  // errors handeling
  const [emailErrors, setEmailErrors] = useState("");
  const [passwordErrors, setPasswordErrors] = useState("");

  useEffect(() => {
    if (propertySignInSuccess && currentProperty) {
      if (isAdmin) {
        console.log(isAdmin);
        navigation.navigate("BottomTabs");
      } else {
        console.log(isAdmin);
        navigation.navigate("SliderPage1");
      }
    } else if (errors.length > 0) {
      console.log("Errors => ", errors);
    }
    return () => {
      setEmailErrors("");
      setPasswordErrors("");
      dispatch(ResetErrorsState());
    };
  }, [propertySignInSuccess]);


  const handleLogin = async (e) => {
    var checking_form = "true";
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
      dispatch(signInUser({ email, password }));
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
        <Text style={styles.title2}>Login to continue</Text>
        {(emailErrors.length > 0 ||
          passwordErrors.length > 0 ||
          errors.length > 0) && (
          <View style={styles.errorContainer}>
            {errors.length > 0 && (
              <Text style={styles.fieldErrors}>{errors}</Text>
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
            source={Images.user}
            style={{ width: "25%", height: "25%", margin: 0 }}
            resizeMode="contain"
          /> */}
          <TextInputComp
            placeholder="Username"
            isPassword={false}
            stateName={email}
            stateNameChange={setUsername}
            icon={
              <AntDesign
                name={"user"}
                size={Metrix.customFontSize(25)}
                color={Colors.white}
              />
            }
            inputStyle={
              emailErrors.length > 0 && { borderColor: "red", borderWidth: 1.5 }
            }
          />
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
            content="Don't have an account yet? please Sign up"
            pressHandler={() => {
              navigation.navigate("SignUp");
            }}
          />
          <ButtonComp
            bgColor={Colors.button}
            txtColor={"#fff"}
            content="login"
            pressHandler={handleLogin}
          />
        </View>
        <BackgroundComp />
      </ScrollView>
    </View>
  );
};

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
});
export default Login;
