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
const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="StartUpScreen"
    >
      <Stack.Screen name="StartUpScreen" component={StartUpScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SliderPage1" component={SliderPage1} />
    </Stack.Navigator>
  );
};

// const BottomStack = () => {
//   return (
//     <Drawer.Navigator
//       initialRouteName="PPCDashboard"
//       drawerContent={props => <BottomComp {...props} />}>
//       <Drawer.Screen name="Home" component={Home} />
//     </Drawer.Navigator>
//   );
// };

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
            <Stack.Screen name="BottomTabs" component={BottomTabs} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="AskPrayer" component={AskPrayer} />
            <Stack.Screen name="PremiumScreen" component={PremiumScreen} />
            <Stack.Screen name="Player" component={PlayerFunct} />
            {/* <Stack.Screen name="AudioPlayer" component={AudioPlayer} /> */}
          </Stack.Navigator>
        </NavigationContainer>
        {/* {loader ? <Loader /> : null} */}
      </>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     user: state.AuthReducer.user,
//   };
// };

export default AppNavigation;
