import { StyleSheet, TextInput, View } from "react-native";
import React from "react";

const TextInputComp = (props) => {
  const { isPassword, icon, placeholder, stateName, stateNameChange, inputStyle } = props;
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputView}>{icon}</View>
      <TextInput
        style={[styles.input, { ...inputStyle}]}
        value={stateName}
        placeholder={placeholder}
        placeholderTextColor={Colors.lighGray}
        onChangeText={(text) => stateNameChange(text)}
        secureTextEntry={isPassword}
      />
    </View>
  );
};

export default TextInputComp;

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  inputView: {
    backgroundColor: Colors.button,
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  input: {
    backgroundColor: Colors.white,
    width: "80%",
    height: 40,
    padding: 12,
  },
});
