import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Colors, Metrix } from "../config";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import {
  collection,
  query,
  getDocs,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase/utils";
import PremiumPlayList from "../components/PremiumPlayList";

const mapState = ({ user }) => ({
  currentProperty: user.currentProperty,
  propertySignInSuccess: user.propertySignInSuccess,
  errors: user.errors,
  isAdmin: user.isAdmin,
  userLoggedId: user.userLoggedId,
});

const PremiumScreen = () => {
  const [search, setSearch] = useState();
  const {
    currentProperty,
    propertySignInSuccess,
    errors,
    isAdmin,
    userLoggedId,
  } = useSelector(mapState);

  const [prayers, setPrayers] = useState([]);
  const [prayersIds, setPrayersIds] = useState([]);
  const getOurFavListIds = async () => {
    const q2 = query(collection(db, `playlists/${userLoggedId}/favourites`));
    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach((doc) => {
      console.log("show 47 ,", doc.data());
      let thisId = doc.data().superId;
      setPrayersIds((oldArray1) => [...oldArray1, thisId]);
    });
    console.log("our ids of favorites prayers", prayersIds);
  };
  const getData = async () => {
    console.log("our ids of favorites prayers", prayersIds);
    const q = query(collection(db, "prayers"));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        var favOrNo = false;
        if (prayersIds.includes(doc.data().id)) {
          favOrNo = true;
        }
        let thisData = doc.data();
        thisData.favOrNot = favOrNo;
        setPrayers((oldPrayer) => [...oldPrayer, thisData]);
      });
    } catch (err) {
      console.log("my error", err);
    }
  };

  useEffect(() => {
    getData();

    console.log("prayers : 77", prayers);

    getOurFavListIds();
    console.log("Fav ids : 77", prayersIds);
  }, []);

  const AddToFavouriteIfNotIn = async (val) => {
    const q = query(collection(db, `playlists/${userLoggedId}/favourites`));
    const querySnapshot = await getDocs(q);
    querySnapshot
      ? console.log('yess it"s exist')
      : console.log('no it"s not exist');
    const docRef = await addDoc(
      collection(db, `playlists/${userLoggedId}/favourites`),
      {
        url: val.url,
        title: val.title,
        artist: val.artist,
        free: val.free,
        album: val.album,
        duration: val.duration,
        superId: val.superId,
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <View style={styles.input}>
          <Feather name={"search"} color={Colors.lighGray} size={20} />
          <TextInput
            value={search}
            placeholder={"Search Your Favourite Prayer"}
            onChangeText={(text) => setSearch(text)}
            placeholderTextColor={Colors.lighGray}
            style={{
              marginLeft: Metrix.HorizontalSize(10),
              width: Metrix.HorizontalSize(190),
              height: Metrix.VerticalSize(44),
            }}
          />
          <TouchableOpacity>
            <FontAwesome
              name={"microphone"}
              color={Colors.lighGray}
              size={20}
              style={{ marginLeft: Metrix.HorizontalSize(10) }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ marginLeft: Metrix.HorizontalSize(10) }}>
          <Text style={{ color: Colors.white }}>Premium</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <Text style={{ fontWeight: "bold" }}>You can download 5 prayers</Text>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          {prayers &&
            prayers.map((val, index) => {
              return (
                <View
                  key={index}
                  style={{ flex: 1, marginBottom: Metrix.VerticalSize(10) }}
                >
                  <PremiumPlayList
                    onPress={() => console.warn("lets see now")}
                    AddToFavouriteIfNotIn={AddToFavouriteIfNotIn}
                    val={val}
                    songTitle={val.title}
                    free={val.free}
                    album={val.album}
                    heart={val.favOrNot}
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

export default PremiumScreen;
