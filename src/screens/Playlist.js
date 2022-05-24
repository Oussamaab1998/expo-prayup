import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { Colors, Metrix } from "../config";
import PlaylistComp from "../components/PlaylistComp";
import { useDispatch, useSelector } from "react-redux";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/utils";

// const StatusBarHeight = Platform.select({
//   ios: 20,
//   android: StatusBar.currentHeight,
//   default: 0,
// });

const mapState = ({ user }) => ({
  currentProperty: user.currentProperty,
  propertySignInSuccess: user.propertySignInSuccess,
  errors: user.errors,
  isAdmin: user.isAdmin,
  userLoggedId: user.userLoggedId,
});

const Search = ({ navigation }) => {
  const {
    currentProperty,
    propertySignInSuccess,
    errors,
    isAdmin,
    userLoggedId,
  } = useSelector(mapState);

  const dispatch = useDispatch();
  const [prayers, setPrayers] = useState([]);
  const getData = async () => {
    try {
      const q = query(collection(db, `playlists/${userLoggedId}/favourites`));
      const myPlayList = onSnapshot(q, (snapshot) => {
        const myData = snapshot.docs.map((doc) => doc.data());
        console.log("this is our data ", myData);
        setPrayers(myData);
      });
    } catch (error) {
      console.log('this error from what i"m trying to do now', error);
    }
  };
  useEffect(() => {
    getData().then(console.log("this is our data", prayers));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <Text style={{ fontWeight: "bold" }}>Playlist</Text>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          {prayers &&
            prayers.map((val, index) => {
              return (
                <View
                  key={index}
                  style={{ flex: 1, marginBottom: Metrix.VerticalSize(10) }}
                >
                  <PlaylistComp
                    onPress={() => {
                      // setTrackPlaying(!trackPlaying);
                      // dispatch({
                      //   type: "TRACK_PLAY",
                      //   payload: val,
                      // });
                      // onTrackItemPress(val);
                      navigation.navigate("Player", {
                        partTitle: "title",
                        id: 2,
                        trackLength: 200,
                      });
                    }}
                    songTitle={val.title}
                    free={val.free}
                    album={val.album}
                  />
                </View>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // marginTop: StatusBarHeight,
  },
  searchBar: {
    backgroundColor: Colors.primary,
    // height: Metrix.VerticalSize(61),
    width: "100%",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
  },
  input: {
    width: Metrix.HorizontalSize(260),
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: Metrix.HorizontalSize(10),
    height: Metrix.VerticalSize(44),
  },
});

export default Search;
