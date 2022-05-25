import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import { NavigationService } from "./src/config";
import Login from "./src/screens/Login";
import StartUpScreen from "./src/screens/StartUpScreen";
import SignUp from "./src/screens/SignUp";
import SliderPage1 from "./src/screens/SliderPage1";

import BottomTabs from "./src/components/BottomTabs";
// import AudioPlayer from "./src/components/AudioPlayer";
import Payment from "./src/screens/Payment";
import PremiumScreen from "./src/screens/PremiumScreen";
import AskPrayer from "./src/screens/AskPrayer";
import PlayerFunct from "./src/screens/FunctionalPlayer";
import { useSelector } from "react-redux";
const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();
const mapState = ({ user }) => ({
  currentProperty: user.currentProperty,
});

const AuthStack = () => {
  const { currentProperty } = useSelector(mapState);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="StartUpScreen"
    >
      {currentProperty && (
        <>
          <Stack.Screen name="StartUpScreen" component={StartUpScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      )}

      {!currentProperty && (
        <>
          {/* <Stack.Screen name="AuthStack" component={AuthStack} /> */}
          <Stack.Screen name="BottomTabs" component={BottomTabs} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="AskPrayer" component={AskPrayer} />
          <Stack.Screen name="PremiumScreen" component={PremiumScreen} />
          <Stack.Screen name="Player" component={PlayerFunct} />
        </>
      )}
    </Stack.Navigator>
  );
};

class AppNavigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { loader, user } = this.props;
    // console.warn(user);
    return (
      <>
        <NavigationContainer
          ref={(ref) => NavigationService.setTopLevelNavigator(ref)}
        >
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={"AuthStack"}
          >
            <Stack.Screen name="AuthStack" component={AuthStack} />
          </Stack.Navigator>
        </NavigationContainer>
        {/* {loader ? <Loader /> : null} */}
      </>
    );
  }
}

export default AppNavigation;
