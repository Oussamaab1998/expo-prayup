import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ShtyleSheet,
  Image,
  StyleSheet,
} from "react-native";
import { Colors, Images, Metrix } from "../config";
import Feather from "@expo/vector-icons/Feather";
const AlbumComp = ({ title, onPress, customAlbum, cTitle }) => {
  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: cTitle
          ? Metrix.HorizontalSize(20)
          : Metrix.HorizontalSize(30),
        backgroundColor: customAlbum ? Colors.button : Colors.primary,
        ...styles.container,
      }}
      onPress={onPress}
    >
      {customAlbum ? (
        <Feather
          name={"plus"}
          size={Metrix.customFontSize(95)}
          color={Colors.white}
        />
      ) : (
        <Image
          source={Images.SongTemplate}
          style={{
            resizeMode: "contain",
            width: Metrix.HorizontalSize(90),
            height: Metrix.VerticalSize(90),
          }}
        />
      )}
      {!customAlbum && (
        <View style={{ marginTop: Metrix.VerticalSize(20) }}>
          <Text style={{ color: Colors.white }}>{title}</Text>
        </View>
      )}
      {cTitle && (
        <View style={{ marginVertical: Metrix.VerticalSize(10) }}>
          <Text style={{ color: Colors.white }}>
            {cTitle}{" "}
            <Text style={{ color: Colors.red, fontWeight: "bold" }}>Pro</Text>
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    paddingVertical: Metrix.VerticalSize(10),
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});

export default AlbumComp;
