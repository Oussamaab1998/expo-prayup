import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import { Colors, Images } from "../config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/utils";
import Feather from "@expo/vector-icons/Feather";

// const StatusBarHeight = Platform.select({
//   ios: 20,
//   android: StatusBar.currentHeight,
//   default: 0,
// });

const AdminScreen = () => {
  const [requests, setRequests] = useState([]);
  var arrayReqs = [];
  const getRequests = async () => {
    const q = query(collection(db, "prayersRequests"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      arrayReqs.push(doc.data());
      console.log(doc.id, " => ", doc.data());
    });
    setRequests(arrayReqs);
  };
  useEffect(() => {
    getRequests();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        {/* <TouchableOpacity
          style={{
            width: '100%',
            alignItems: 'flex-end',
            paddingTop: 20,
            paddingHorizontal: 20,
          }}>
          <FontAwesome name={'pencil'} size={25} color={Colors.white} />
        </TouchableOpacity> */}
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
          <Text style={{ color: Colors.white, fontSize: 24 }}>Admin</Text>
          <Text
            style={{
              color: Colors.backGray,
              fontSize: 20,
              fontStyle: "italic",
              textDecorationLine: "underline",
            }}
          ></Text>
        </View>
      </View>
      <View
        style={{
          paddingTop: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.TitleStyle}>List Of Requests</Text>
        <View style={styles.requestsCards}>
          {requests.map((item) => (
            <View style={styles.requestsCardsCard}>
              <Text style={styles.TitStyle}>
                User Request : {item.requestText}
              </Text>
              <TouchableOpacity>
                <Feather name={"file-plus"} color={Colors.primary} size={22} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      {/* <ScrollView style={{ paddingTop: 10 }}>
        <View style={{ marginBottom: 20 }}>

      </ScrollView> */}
    </View>
  );
};
const styles = StyleSheet.create({
  TitStyle: {
    fontSize: 18,
    paddingBottom: 15,
  },
  requestsCards: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  requestsCardsCard: {
    paddingVertical: 5,
    borderWidth: 3,
    borderColor: Colors.primary,
    width: "80%",
    height: 80,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  TitleStyle: {
    fontWeight: "bold",
    fontSize: 22,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.backGray,
    // marginTop: StatusBarHeight,
  },
  topView: {
    // height: 300,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    paddingBottom: 30,
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

export default AdminScreen;
