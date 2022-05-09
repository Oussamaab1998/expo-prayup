import React, { useState, useEffect } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import Playlist from "../screens/Playlist";
import { Colors, Metrix } from "../config";
import { useSelector } from "react-redux";
import PlaylistComp from "./PlaylistComp";
import { useDispatch } from "react-redux";
import { NavigationService } from "../config";
import AdminScreen from "../screens/AdminScreen";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/utils";

const mapState = ({ user }) => ({
  currentProperty: user.currentProperty,
  propertySignInSuccess: user.propertySignInSuccess,
  errors: user.errors,
  isAdmin: user.isAdmin,
});

const BottomTabs = () => {
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

  const Tab = createBottomTabNavigator();
  //   const track = useSelector(state => state?.TrackReducer?.data);
  useEffect(() => {
    console.log(isAdmin);
    console.log("this one is not undefined ? ", currentProperty);
  }, [isAdmin]);
  const track = [
    {
      id: "1",
      url: "https://www.chosic.com/wp-content/uploads/2021/07/Raindrops-on-window-sill.mp3",
      title: "Worship and Praise1",
      artist: "The Epic Hero",
      free: true,
      album: "Vocalist and band",
      duration: 149,
    },
    {
      id: "2",
      url: "https://www.chosic.com/wp-content/uploads/2021/07/Raindrops-on-window-sill.mp3",
      title: "Test ",
      artist: "The Epic Hero",
      free: false,
      album: "Vocalist and band",
      duration: 148,
    },
  ];
  return (
    <>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      {track && (
        <View
          style={{
            position: "absolute",
            bottom: 100,
            zIndex: 9999,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <PlaylistComp
            onPress={() => NavigationService.navigate("AudioPlayer")}
            songTitle={track[0].title}
            free={track[0].free}
            album={track[0].album}
            // playing={true}
          />
        </View>
      )}
      <Tab.Navigator
        // tabBarOptions={{ showLabel: true, keyboardHidesTabBar: true }}
        screenOptions={({ route }) => ({
          headerShown: false,
          activeTintColor: "blue",
          inactiveTintColor: "gray",
          style: {
            borderTopWidth: 0,
            elevation: 0,
            ...styles.shadow,
          },
          keyboardHidesTabBar: true,
          tabBarStyle: {
            height: Metrix.VerticalSize(100),
            paddingHorizontal: Metrix.HorizontalSize(5),
            paddingTop: 10,
            paddingBottom: 20,
            backgroundColor: Colors.primary,
            position: "absolute",
            borderTopWidth: 0,
          },
          tabBarLabelStyle: {
            fontSize: 18,
            color: "white",
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          headerShown={false}
          initialParams={{ data: prayers }}
          options={{
            tabBarLabel: "Library",
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 60,
                  // height: 60,
                  borderRadius: 30 / 2,
                  backgroundColor: focused ? "#fffff" : Colors.primary,
                  // padding: 10
                }}
              >
                <FontAwesome
                  name={"home"}
                  size={25}
                  color={focused ? "#CCCCFF" : Colors.white}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <FontAwesome
                  name={"search"}
                  size={25}
                  color={focused ? "#CCCCFF" : Colors.white}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Playlist"
          component={Playlist}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <FontAwesome
                  name={"music"}
                  size={25}
                  color={focused ? "#CCCCFF" : Colors.white}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name={`${isAdmin ? "Admin" : "Profile"}  `}
          component={!isAdmin ? Profile : AdminScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <FontAwesome
                  name={"user"}
                  size={25}
                  color={focused ? "#CCCCFF" : Colors.white}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

// const mapStateToProps = state => ({
//   track: TrackReducer.track,
// });
// const mapDispatchToProps = dispatch => ({});

export default BottomTabs;
