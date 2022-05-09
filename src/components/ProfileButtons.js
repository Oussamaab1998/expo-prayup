import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Colors } from "../config";
import AntDesign from "@expo/vector-icons/AntDesign";

const ProfileButtons = ({ onPress, title, imageUri, upgrade }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={imageUri}
          style={{
            resizeMode: "contain",
            width: 22,
            height: 22,
            marginRight: 20,
          }}
        />
        <Text style={{ color: Colors.black, fontSize: 15 }}>{title}</Text>
        {upgrade && (
          <View
            style={{
              borderRadius: 10,
              backgroundColor: Colors.red,
              paddingVertical: 2,
              paddingHorizontal: 10,
              marginLeft: 10,
            }}
          >
            <Text style={{ color: Colors.white }}>Pro</Text>
          </View>
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {upgrade && (
          <View
            style={{
              borderRadius: 12 / 2,
              backgroundColor: Colors.red,
              height: 12,
              width: 12,
            }}
          />
        )}
        <AntDesign name={"right"} color={Colors.gray} size={20} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // height: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    alignItems: "center",
    // justifyContent: 'center'
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#A7A7A7",
    paddingVertical: 10,
  },
});

export default ProfileButtons;
