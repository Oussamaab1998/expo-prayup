import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Colors, Images, Metrix } from "../config";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRoute } from "@react-navigation/native";
const PlaylistComp = ({
  isCurrent,
  onPress,
  songTitle,
  free,
  album,
  playing,
  AddToFavouriteIfNotIn,
  val,
  navigation,
}) => {
  const route = useRoute();
  const [showOrNot, setShowOrNot] = useState(false);
  useEffect(() => {
    if (route.name === "Search") {
      setShowOrNot(true);
    }
  }, [route.name]);

  useEffect(() => {
    console.log("isCurrent => ", isCurrent);
  }, [isCurrent]);

  return (
    <>
      {isCurrent ? (
        <TouchableOpacity
          style={styles.container1}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <View style={styles.playerConatiner}>
            <View
              style={[
                styles.leftImage,
                free
                  ? { backgroundColor: Colors.primary }
                  : { backgroundColor: "yellow" },
              ]}
            >
              <Image
                source={free ? Images.SongTemplate : Images.locked}
                resizeMode="contain"
                style={styles.imgStyle}
              />
            </View>
            <View style={styles.contentContainer}>
              <Text style={{ fontWeight: "bold", color: "black" }}>
                {songTitle}
              </Text>
              <View style={{ flexDirection: "row" }}>
                {free ? (
                  <Text style={{ color: Colors.green, fontWeight: "bold" }}>
                    Free
                  </Text>
                ) : (
                  <Text style={{ color: Colors.red, fontWeight: "bold" }}>
                    Pro
                  </Text>
                )}
                <Text
                  style={{
                    color: Colors.lighGray,
                    marginLeft: Metrix.HorizontalSize(10),
                  }}
                >
                  {album}
                </Text>
              </View>
            </View>
          </View>
          {/* <View
            style={{ alignItems: "center", justifyContent: "center" }}
            onPress={onPress}
          >
            {showOrNot ? (
              <TouchableOpacity onPress={() => AddToFavouriteIfNotIn(val)}>
                {val.favOrNot ? (
                  <MaterialIcons
                    name={"favorite"}
                    color={Colors.primary}
                    size={Metrix.customFontSize(36)}
                  />
                ) : (
                  <MaterialIcons
                    name={"favorite-border"}
                    color={Colors.primary}
                    size={Metrix.customFontSize(36)}
                  />
                )}
              </TouchableOpacity>
            ) : null}
          </View> */}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.container2, styles.shadow]}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                ...styles.view,
                paddingHorizontal: free ? Metrix.HorizontalSize(10) : 0,
                paddingVertical: free ? Metrix.VerticalSize(5) : 0,
              }}
            >
              <Image
                source={free ? Images.SongTemplate : Images.locked}
                style={{
                  resizeMode: free ? "contain" : "cover",
                  width: free
                    ? Metrix.HorizontalSize(50)
                    : Metrix.HorizontalSize(70),
                  height: free
                    ? Metrix.VerticalSize(50)
                    : Metrix.VerticalSize(60),
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View>
                <Text style={{ fontWeight: "bold", color: "black" }}>
                  {songTitle}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  {free ? (
                    <Text style={{ color: Colors.green, fontWeight: "bold" }}>
                      Free
                    </Text>
                  ) : (
                    <Text style={{ color: Colors.red, fontWeight: "bold" }}>
                      Pro
                    </Text>
                  )}
                  <Text
                    style={{
                      color: Colors.lighGray,
                      marginLeft: Metrix.HorizontalSize(10),
                    }}
                  >
                    {album}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{ alignItems: "center", justifyContent: "center" }}
            onPress={onPress}
          >
            {showOrNot ? (
              <TouchableOpacity onPress={() => AddToFavouriteIfNotIn(val)}>
                {val.favOrNot ? (
                  <MaterialIcons
                    name={"favorite"}
                    color={Colors.primary}
                    size={Metrix.customFontSize(36)}
                  />
                ) : (
                  <MaterialIcons
                    name={"favorite-border"}
                    color={Colors.primary}
                    size={Metrix.customFontSize(36)}
                  />
                )}
              </TouchableOpacity>
            ) : null}
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container1: {
    width: "100%",
    paddingVertical: 5,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.lighGray,
  },
  container2: {
    alignSelf: "center",
    width: "90%",
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.lighGray,
  },
  playerConatiner: {
    flexDirection: "row",
  },
  // image
  leftImage: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  imgStyle: {
    width: 50,
    height: 35,
  },
  // image
  contentContainer: {
    marginLeft: 10,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
});

export default PlaylistComp;
