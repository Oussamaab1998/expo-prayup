import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
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
      {track && (
        <View
          style={{
            position: "absolute",
            bottom: 63,
            left: 0,
            right: 0,
            zIndex: 9999,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            width: "100%",
          }}
        >
          <PlaylistComp
            isCurrent={true}
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
          tabBarShowLabel: false,
          headerShown: false,
          activeTintColor: "blue",
          inactiveTintColor: "gray",
          style: {
            borderTopWidth: 0,
            elevation: 0,
            ...styles.shadow,
          },
          // showLabel: false,
          keyboardHidesTabBar: true,
          tabBarStyle: {
            height: 65,
            padding: 20,
            backgroundColor: Colors.primary,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            color: "white",
            paddingBottom: 10,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          headerShown={false}
          initialParams={{ data: prayers }}
          options={{
            tabBarIcon: ({ focused }) => (
              <>
                <FontAwesome
                  name={"home"}
                  size={22}
                  color={focused ? "#CCCCFF" : Colors.white}
                />
                <Text style={styles.subTitle}>Library</Text>
              </>
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({ focused }) => (
              <>
                <FontAwesome
                  name={"search"}
                  size={22}
                  color={focused ? "#CCCCFF" : Colors.white}
                />
                <Text style={styles.subTitle}>Search</Text>
              </>
            ),
          }}
        />
        <Tab.Screen
          name="Playlist"
          component={Playlist}
          options={{
            tabBarIcon: ({ focused }) => (
              <>
                <FontAwesome
                  name={"music"}
                  size={22}
                  color={focused ? "#CCCCFF" : Colors.white}
                />
                <Text style={styles.subTitle}>Playlist</Text>
              </>
            ),
          }}
        />
        <Tab.Screen
          name={`${isAdmin ? "Admin" : "Profile"}  `}
          component={!isAdmin ? Profile : AdminScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <>
                <FontAwesome
                  name={"user"}
                  size={22}
                  color={focused ? "#CCCCFF" : Colors.white}
                />
                <Text style={styles.subTitle}>{`${
                  isAdmin ? "Admin" : "Profile"
                }  `}</Text>
              </>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 10,
    color: "white",
    marginTop: 5,
    marginBottom: 10,
  },
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
