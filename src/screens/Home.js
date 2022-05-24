import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { Colors, Metrix, NavigationService } from "../config";
import AlbumComp from "../components/AlbumComp";
import PlaylistComp from "../components/PlaylistComp";
import { useDispatch } from "react-redux";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/utils";

// const StatusBarHeight = Platform.select({
//   ios: 20,
//   android: StatusBar.currentHeight,
//   default: 0,
// });

const Home = ({ route, navigation }) => {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const myDATA = route.params.data;
  const data = [
    {
      id: "0",
      url: "https://www.chosic.com/wp-content/uploads/2021/07/Raindrops-on-window-sill.mp3",
      title: "Worship and Praise1",
      artist: "The Epic Hero",
      free: true,
      album: "Vocalist and band",
      duration: 149,
    },
    {
      id: "1",
      url: "https://www.chosic.com/wp-content/uploads/2021/07/The-Epic-Hero-Epic-Cinematic-Keys-of-Moon-Music.mp3",
      title: "Worship and Praise2",
      artist: "The Epic Hero",
      free: false,
      album: "Vocalist and band",
      duration: 119,
    },
    {
      id: "2",
      url: "https://www.chosic.com/wp-content/uploads/2021/07/purrple-cat-equinox.mp3",
      title: "Worship and Praise3",
      artist: "The Epic Hero",
      free: true,
      album: "Vocalist and band",
      duration: 140,
    },
    {
      id: "3",
      url: "https://www.chosic.com/wp-content/uploads/2021/04/And-So-It-Begins-Inspired-By-Crush-Sometimes.mp3",
      title: "Worship and Praise4",
      artist: "The Epic Hero",
      free: true,
      album: "Vocalist and band",
      duration: 178,
    },
    {
      id: "4",
      url: "https://www.chosic.com/wp-content/uploads/2021/05/inossi-got-you.mp3",
      title: "Worship and Praise5",
      artist: "The Epic Hero",
      free: false,
      album: "Vocalist and band",
      duration: 66,
    },
    {
      id: "5",
      url: "https://www.chosic.com/wp-content/uploads/2021/04/kvgarlic__largestreamoverloginforestmarch.mp3",
      title: "Worship and Praise6",
      artist: "The Epic Hero",
      free: true,
      album: "Vocalist and band",
      duration: 149,
    },
    {
      id: "6",
      url: "https://www.chosic.com/wp-content/uploads/2021/07/The-Epic-Hero-Epic-Cinematic-Keys-of-Moon-Music.mp3",
      title: "Worship and Praise7",
      artist: "The Epic Hero",
      free: false,
      album: "Vocalist and band",
      duration: 149,
    },
    {
      id: "7",
      url: "https://www.chosic.com/wp-content/uploads/2021/07/The-Epic-Hero-Epic-Cinematic-Keys-of-Moon-Music.mp3",
      title: "Worship and Praise8",
      artist: "The Epic Hero",
      free: true,
      album: "Vocalist and band",
      duration: 149,
    },
    {
      id: "8",
      url: "https://www.chosic.com/wp-content/uploads/2021/07/The-Epic-Hero-Epic-Cinematic-Keys-of-Moon-Music.mp3",
      title: "Worship and Praise9",
      artist: "The Epic Hero",
      free: true,
      album: "Vocalist and band",
      duration: 149,
    },
    {
      id: "9",
      url: "https://www.chosic.com/wp-content/uploads/2021/07/The-Epic-Hero-Epic-Cinematic-Keys-of-Moon-Music.mp3",
      title: "Worship and Praise10",
      artist: "The Epic Hero",
      free: false,
      album: "Vocalist and band",
      duration: 149,
    },
    {
      id: "10",
      url: "https://www.chosic.com/wp-content/uploads/2021/07/The-Epic-Hero-Epic-Cinematic-Keys-of-Moon-Music.mp3",
      title: "Worship and Praise11",
      artist: "The Epic Hero",
      free: true,
      album: "Vocalist and band",
      duration: 149,
    },
  ];
  const dispatch = useDispatch();
  const [prayers, setPrayers] = useState([]);
  const getData = async () => {
    const q = query(collection(db, "prayers"));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setPrayers((oldPrayer) => [...oldPrayer, doc.data()]);
        // setMyFiles((oldArray) => [...oldArray, obj]);
      });
    } catch (err) {
      console.log("my error", err);
    }
  };
  useEffect(() => {
    getData().then(console.log("this is our data", prayers));
  }, []);

  return (
    <ScrollView
      style={styles.container}
      // contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.album}>
        <AlbumComp
          // style={{ width: "100%" }}
          onPress={() => console.warn("pressed")}
          title={"Prayer Album"}
        />
      </View>
      {prayers &&
        prayers.map((val, index) => {
          return (
            <View key={index.toString()} style={{ flex: 1, marginBottom: 0 }}>
              <PlaylistComp
                onPress={() => {
                  // setTrackPlaying(!trackPlaying);
                  navigation.navigate("Player", {
                    id: val.superId,
                    trackLength: 200,
                  });
                }}
                songTitle={val.title}
                free={val.free}
                album={val.album}
                // playing={selectedTrack ? trackPlaying : false}
              />
            </View>
          );
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 0,
    // marginBottom: Metrix.VerticalSize(70),
    // marginTop: StatusBarHeight,
    paddingTop: 10,
  },
  contentContainer: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  album: {
    paddingBottom: 10,
    width: "100%",
  },
});

export default Home;
