import {
  StackActions,
  CommonActions,
  DrawerActions,
} from "@react-navigation/native";

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(name, params) {
  _navigator.dispatch(
    CommonActions.navigate({
      name,
      params,
    })
  );
}

function goBack() {
  _navigator.dispatch(CommonActions.goBack());
}

function resetStack(name) {
  _navigator.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name }],
    })
  );
}

function openDrawer() {
  _navigator.dispatch(DrawerActions.openDrawer());
}

function closeDrawer() {
  _navigator.dispatch(DrawerActions.closeDrawer());
}

export default {
  navigate,
  resetStack,
  setTopLevelNavigator,
  goBack,
  openDrawer,
  closeDrawer,
};
