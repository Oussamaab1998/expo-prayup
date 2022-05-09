import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Colors, Images } from "../config";
import ProfileButtons from "../components/ProfileButtons";
import { db } from "../firebase/utils";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const Profile = ({ navigation }) => {
  const [profilEmail, setProfilEmail] = useState("user email");
  const [profilFullName, setProfilFullName] = useState("user name");
  const auth = getAuth();
  const userAuthId = auth.currentUser.uid;

  const getEmailAndFullNameOfTheUser = async () => {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      if (doc.id === userAuthId) {
        setProfilEmail(doc.data().email);
        setProfilFullName(doc.data().fullname);
      }
    });
  };

  useEffect(() => {
    console.log("userAuthId => ", userAuthId);
    getEmailAndFullNameOfTheUser();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <View style={styles.imageView}>
            <View style={styles.imageView2}>
              <Image
                source={require("../assets/boy.png")}
                style={{
                  resizeMode: "cover",
                  width: 110,
                  height: 110,
                  borderRadius: 110 / 2,
                }}
              />
            </View>
          </View>
          <Text style={{ color: Colors.white, fontSize: 24 }}>
            {profilEmail}
          </Text>
          <Text
            style={{
              color: Colors.backGray,
              fontSize: 20,
              fontStyle: "italic",
              textDecorationLine: "underline",
            }}
          >
            {profilFullName}
          </Text>
        </View>
      </View>
      <ScrollView style={{ paddingTop: 10 }}>
        <View style={{ marginBottom: 20 }}>
          <ProfileButtons
            title={"Upgrade"}
            upgrade={true}
            imageUri={Images.profileStar}
            onPress={() => navigation.navigate("Payment")}
          />
        </View>
        <ProfileButtons
          title={"Custom Prayers"}
          imageUri={Images.profilePlaylist}
          onPress={() => navigation.navigate("AskPrayer")}
        />
        <ProfileButtons
          title={"Notifications"}
          imageUri={Images.profileAlarm}
          onPress={() => console.warn("Pressed")}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backGray,
  },
  topView: {
    // height: 300,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    paddingBottom: 30,
    paddingTop: 40,
  },
  imageView: {
    width: 170,
    height: 170,
    borderRadius: 170 / 2,
    borderWidth: 20,
    borderColor: "#8B6FB8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  imageView2: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    borderWidth: 5,
    borderColor: Colors.button,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Profile;
