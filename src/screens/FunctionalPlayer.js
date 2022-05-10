import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Slider from "react-native-slider";

import Moment from "moment";
import { FontAwesome5 } from "@expo/vector-icons";
import { Audio } from "expo-av";

const PlayerFunct = ({ navigation, route }) => {
  const sound = React.useRef(new Audio.Sound());
  const { partTitle, id } = route.params;
  const [Loaded, SetLoaded] = React.useState(false);
  const [Loading, SetLoading] = React.useState(false);
  const [trackLength, setTrackLength] = useState(3500);
  const [timeElapsed, setTimeElapsed] = useState("0:00");
  const [timeRemaining, setTimeRemaining] = useState("5:00");
  const [playOrPause, setPlayOrPause] = useState(false);
  const [played, setPlayed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [firstTime, setFirstTime] = useState(false);
  const [mounted, setMounted] = useState(false);
  /* Test An Other Slider 1 Start */
  const textRef = useRef();

  /* Test An Other Slider 1 End */

  const Tracks = [
    {
      id: 0,
      title: "Part",
      track:
        "https://firebasestorage.googleapis.com/v0/b/prayup-9efba.appspot.com/o/Anniversary%201.mp3?alt=media&token=62d50f58-f431-4e31-9b54-6e8ef57f9e4d",
    },
    {
      id: 1,
      title: "Part",
      track:
        "https://firebasestorage.googleapis.com/v0/b/prayup-9efba.appspot.com/o/BUSINESS%203.mp3?alt=media&token=9f5ceeaa-806d-45c9-9bed-23a5d46b3bb0",
    },
    {
      id: 2,
      title: "Part",
      track:
        "https://firebasestorage.googleapis.com/v0/b/prayup-9efba.appspot.com/o/Brother.mp3?alt=media&token=1e7035dd-30fc-4e52-b5ce-0106bc491de9",
    },
    {
      id: 3,
      title: "Part",
      track:
        "https://firebasestorage.googleapis.com/v0/b/prayup-9efba.appspot.com/o/Birthday%202.mp3?alt=media&token=133e58de-d628-44f2-95d9-0008aa595f31",
    },
    {
      id: 4,
      title: "Part",
      track:
        "https://firebasestorage.googleapis.com/v0/b/prayup-9efba.appspot.com/o/Business1.mp3?alt=media&token=253ba692-08a3-4295-9820-a81032a79544",
    },
    {
      id: 5,
      title: "Part",
      track:
        "https://firebasestorage.googleapis.com/v0/b/prayup-9efba.appspot.com/o/CHILDREN%201.mp3?alt=media&token=5f74f3d9-364a-4bc1-9a50-46be9339308a",
    },
    {
      id: 6,
      title: "Part",
      track:
        "https://firebasestorage.googleapis.com/v0/b/prayup-9efba.appspot.com/o/Children%203.mp3?alt=media&token=c5bf01a8-64de-4bb4-bf72-8109443d5031",
    },
    {
      id: 7,
      title: "Part",
      track:
        "https://firebasestorage.googleapis.com/v0/b/prayup-9efba.appspot.com/o/Daughter%201.mp3?alt=media&token=e6ee281a-e167-43cc-bf0f-4440d84762a9",
    },
  ];
  const [CurrentSong, SetCurrentSong] = React.useState(Tracks[id]);

  useEffect(() => {}, []);

  const NextSong = () => {
    if (CurrentSong.id === Tracks[Tracks.length - 1].id) {
      SetCurrentSong(Tracks[0]);
      setPlayOrPause(false);
    } else {
      SetCurrentSong(Tracks[CurrentSong.id + 1]);
      setPlayOrPause(false);
    }
  };

  const PrevSong = () => {
    if (CurrentSong.id === 0) {
      SetCurrentSong(Tracks[Tracks.length - 1]);
      setPlayOrPause(false);
    } else {
      SetCurrentSong(Tracks[CurrentSong.id - 1]);
      setPlayOrPause(false);
    }
  };

  const changeTime = (seconds) => {
    console.log("---------- seconds : ", seconds);
    console.log("---------- trackLength : ", trackLength);

    var minutes = Math.floor(seconds / 60);
    var secondss = ((seconds % 60) / 1000).toFixed(0);
    var res = minutes.toString() + ":" + secondss.toString();
    setTimeElapsed(res);
    setTimeRemaining(res);

    // setTimeElapsed(Moment.utc(seconds * 1000).format("m:ss"));
    // setTimeRemaining(
    //   Moment.utc((trackLength - seconds) * 1000).format("	HH:mm:ss")
    // );
  };
  const convertMillisToSec = (mil) => {
    var sec = Math.floor(mil / 1000);
    return sec;
  };
  const changeTimeInitial = (seconds) => {
    console.log("let try that => ", seconds);
    var sec = Math.floor((seconds / 1000) % 60);
    setTimeElapsed("0:00");

    var minutes = Math.floor(seconds / 60000);
    var secondss = ((seconds % 60000) / 1000).toFixed(0);
    var res = minutes.toString() + ":" + secondss.toString();
    console.log('Moment.utc(sec * 1000).format("m:ss")', res);
    setTimeRemaining(res);
  };

  const setTrackLengthFunct = (millis) => {
    var secondss = (result.durationMillis / 1000).toFixed(0);
    console.log("haha our tracklength not 15 : ", secondss);
    setTrackLength((result.durationMillis / 1000).toFixed(0));

    result.durationMillis;
  };

  const onPlaybackStatusUpdate = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          console.log(" lets Gooo");
          setCurrentTime(convertMillisToSec(result.positionMillis));
          // currentTimee.setValue(convertMillisToSec(result.positionMillis));
          // Update Time Elapsed and Time Remaining
          setTimeRemaining(
            Moment.utc(
              (trackLength - convertMillisToSec(result.positionMillis)) * 1000
            ).format("m:ss")
          );
          setTimeElapsed(
            Moment.utc(convertMillisToSec(result.positionMillis) * 1000).format(
              "m:ss"
            )
          );
        } else {
          console.log(" ghghghghgh is paused");
          return 0;
        }
      }
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  React.useEffect(() => {
    if (mounted) {
      console.log("hello there is a call there for this function ");
      LoadAudio();
    }
    console.log("is this excuted ");
    return () => Unload();
  }, [mounted, CurrentSong]);

  const LoadAudio = async () => {
    SetLoaded(false);
    SetLoading(true);
    const checkLoading = await sound.current.getStatusAsync();
    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync(
          {
            uri: CurrentSong.track,
          },
          {},
          true
        );

        if (result.isLoaded === false) {
          SetLoading(false);
          console.log("Error in Loading Audio");
        } else {
          console.log("hahaha", result);
          setTrackLength((result.durationMillis / 1000).toFixed(0));
          changeTimeInitial(result.durationMillis);
          console.log("11111 Again", trackLength);

          console.log("Can you see me", result.durationMillis);
          console.log("22222 Again", trackLength);
          //   setTimeElapsed(result.durationMillis);
          SetLoading(false);
          // PlayAudio();
          SetLoaded(true);
          setFirstTime(true);
        }
        if (!mounted) {
          setMounted(true);
        }
      } catch (error) {
        console.log(error);
        SetLoading(false);
      }
    } else {
      SetLoading(false);
    }
  };

  const LoadAudioFirstTime = async () => {
    try {
      const result = await sound.current.loadAsync(
        {
          uri: CurrentSong.track,
        },
        {},
        true
      );

      if (result.isLoaded === false) {
        setMounted(true);
        console.log("result.isLoaded === false");
      } else {
        console.log("hahaha", result);
        setTrackLength((result.durationMillis / 1000).toFixed(0));
        setMounted(true);
      }
    } catch (error) {
      setMounted(true);
      console.log("catch (error) ");
      console.log(error);
    }
  };

  const Unload = async () => {
    await sound.current.unloadAsync();
  };
  const checkForTheFirstTime = async () => {
    if (!mounted) {
      // Code for componentWillMount here
      // This code is called only one time before intial render
      console.log("Code for componentWillMount here");
      await LoadAudioFirstTime();
    }
  };
  if (!mounted) {
    checkForTheFirstTime();
  }

  const PlayAudio = async () => {
    try {
      console.log("PlayAudio");
      const result = await sound.current.getStatusAsync();
      console.log("result", result);
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playAsync();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (firstTime) {
    console.log("now yes");
    sound.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
  }

  const PauseAudio = async () => {
    console.log("PauseAudio");
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          sound.current.pauseAsync();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const PlayFromThisPosition = async (sec) => {
    if (played) {
      console.log("lets check here ", timeRemaining);
      console.log("22222 Again", trackLength);
      var positionInMillis = sec * 1000;
      console.log("PlayFromThisPosition");
      try {
        const result = await sound.current.getStatusAsync();
        if (result.isLoaded) {
          if (result.isPlaying === true) {
            console.log("PlayFromThisPosition try here line 231");
            sound.current.pauseAsync();
            sound.current.setPositionAsync(positionInMillis);
            setCurrentTime(sec);
            sound.current.playAsync();
            setPlayOrPause(true);
          } else {
            console.log("PlayFromThisPosition try here line 238");
            sound.current.setPositionAsync(positionInMillis);
            setCurrentTime(sec);
            sound.current.playAsync();
            setPlayOrPause(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("its the first time ");
      setPlayed(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <View style={{ alignItems: "center", marginTop: 24 }}>
          <Text style={[styles.textLight, { fontSize: 12 }]}>PLAYLIST</Text>
          <Text
            style={[
              styles.text,
              { fontSize: 15, fontWeight: "500", marginTop: 8 },
            ]}
          >
            Pray Up
          </Text>
        </View>

        <View style={styles.coverContainer}>
          <Image
            source={require("../assets/book.png")}
            resizeMethod="resize"
            resizeMode="contain"
            style={styles.cover}
          ></Image>
        </View>

        <View style={{ alignItems: "center", marginTop: 32 }}>
          <Text style={[styles.textDark, { fontSize: 20, fontWeight: "500" }]}>
            {CurrentSong.title}
          </Text>
          <Text style={[styles.text, { fontSize: 16, marginTop: 8 }]}>
            Pray Up
          </Text>
        </View>
      </View>
      <View style={{ margin: 32 }}>
        <Slider
          onValueChange={(seconds) => {
            console.log("hello there ", seconds);
            changeTime(seconds);
            PlayFromThisPosition(seconds);
          }}
          value={currentTime}
          minimumValue={0}
          maximumValue={trackLength}
          trackStyle={styles.track}
          thumbStyle={styles.thumb}
          minimumTrackTintColor="#93A8B3"
          onSlidingComplete={(value) => setCurrentTime(value.toFixed(0))}
        ></Slider>
        <View
          style={{
            marginTop: 0,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={[styles.textLight, styles.timeStamp]}>
            {timeElapsed}
          </Text>
          <Text style={[styles.textLight, styles.timeStamp]}>
            {timeRemaining}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 16,
        }}
      >
        <TouchableOpacity onPress={PrevSong}>
          <FontAwesome5
            name="backward"
            size={32}
            color="#93A8B3"
          ></FontAwesome5>
        </TouchableOpacity>

        {!playOrPause ? (
          <TouchableOpacity
            style={styles.playButtonContainer}
            onPress={() => {
              setPlayOrPause(true);
              PlayAudio();
            }}
          >
            <FontAwesome5
              name="play"
              size={32}
              color="#3D425C"
              style={[styles.playButton, { marginLeft: 8 }]}
            ></FontAwesome5>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.playButtonContainer}
            onPress={() => {
              setPlayOrPause(false);
              PauseAudio();
            }}
          >
            <FontAwesome5
              name="pause"
              size={32}
              color="#3D425C"
              style={[styles.playButton, { marginLeft: 8 }]}
            ></FontAwesome5>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={NextSong}>
          <FontAwesome5 name="forward" size={32} color="#93A8B3"></FontAwesome5>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default PlayerFunct;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEAEC",
  },
  textLight: {
    color: "#B6B7BF",
  },
  text: {
    color: "#8E97A6",
  },
  textDark: {
    color: "#3D425C",
  },
  coverContainer: {
    marginTop: 32,
    width: 250,
    height: 250,
    shadowColor: "#5D3F6A",
    shadowOffset: { height: 15 },
    shadowRadius: 8,
    shadowOpacity: 0.3,
  },
  cover: {
    width: 250,
    height: 250,
    borderRadius: 125,
  },
  track: {
    height: 2,
    borderRadius: 1,
    backgroundColor: "#FFF",
  },
  thumb: {
    width: 8,
    height: 8,
    backgroundColor: "#3D425C",
  },
  timeStamp: {
    fontSize: 11,
    fontWeight: "500",
  },
  playButtonContainer: {
    backgroundColor: "#FFF",
    borderColor: "rgba(93, 63, 106, 0.2)",
    borderWidth: 16,
    width: 128,
    height: 128,
    borderRadius: 64,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 32,
    shadowColor: "#5D3F6A",
    shadowRadius: 30,
    shadowOpacity: 0.5,
  },
});
