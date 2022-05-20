import "react-native-gesture-handler";
import React from "react";
import { SafeAreaView, StatusBar, LogBox } from "react-native";
import { Provider } from "react-redux";
import AppNavigation from "./AppNavigation";
import store from "./src/redux/createStore";

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
        <AppNavigation />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
