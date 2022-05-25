import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import Moment from "moment";
import { FontAwesome5 } from "@expo/vector-icons";
import { Audio } from "expo-av";
import Anniv from "../files/Anniversary1.mp3";
import Brother from "../files/Brother.mp3";
import Business from "../files/BUSINESS3.mp3";
import Children1 from "../files/CHILDREN1.mp3";
import Daughter from "../files/Daughter.mp3";
import Failure from "../files/FAILURE3.mp3";
import Fear from "../files/FEAR4.mp3";
const PlayerFunct = ({ navigation, route }) => {
  const sound = React.useRef(new Audio.Sound());
  const { partTitle, id } = route.params;
  const [Loaded, SetLoaded] = React.useState(false);
  const [Loading, SetLoading] = React.useState(false);
  const [trackLength, setTrackLength] = useState(200);
  const [timeElapsed, setTimeElapsed] = useState("--:--");
  const trackLenghRef = useRef(12);
  const [timeRemaining, setTimeRemaining] = useState("--:--");
  const [playOrPause, setPlayOrPause] = useState(false);
  const [played, setPlayed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [firstTime, setFirstTime] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [canItPlay, setCanItPlay] = useState(false);
  /* Test An Other Slider 1 Start */
  const textRef = useRef();

  /* Test An Other Slider 1 End */

  const Tracks = [
    {
      id: 0,
      title: "Anniversary",
      track: Anniv,
    },
    {
      id: 1,
      title: "Brother",
      track: Brother,
    },
    {
      id: 2,
      title: "Bussiness",
      track: Business,
    },
    {
      id: 3,
      title: "Children 1",
      track: Children1,
    },
    {
      id: 4,
      title: "Daughter",
      track: Daughter,
    },
    {
      id: 5,
      title: "FAILURE 3",
      track: Failure,
    },
    {
      id: 5,
      title: "FEAR 4 ",
      track: Fear,
    },
  ];
  const [CurrentSong, SetCurrentSong] = React.useState(Tracks[id]);

  useEffect(() => {});

  // const PauseAudio = async () => {
  //   console.log("PauseAudio");
  //   try {
  //     const result = await sound.current.getStatusAsync();
  //     if (result.isLoaded) {
  //       if (result.isPlaying === true) {
  //         sound.current.pauseAsync();
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const NextSong = async () => {
    stopThere();
    setCurrentTime(0);
    if (CurrentSong.id === Tracks[Tracks.length - 1].id) {
      console.log("next no");
      SetCurrentSong(Tracks[0]);
      setPlayOrPause(false);
    } else {
      console.log("next yess");
      SetCurrentSong(Tracks[CurrentSong.id + 1]);
      setPlayOrPause(false);
    }
  };

  const stopThere = async (playbackObj) => {
    try {
      await sound.current.stopAsync();
      await sound.current.unloadAsync();
    } catch (error) {
      console.log("error inside playNext helper method", error.message);
    }
  };

  // try {
  //   const result = await sound.current.getStatusAsync();
  //   if (result.isLoaded) {
  //     if (result.isPlaying === true) {
  //       sound.current.pauseAsync();
  //     }
  //   }
  // }

  const PrevSong = async () => {
    stopThere();
    setCurrentTime(0);
    if (CurrentSong.id === 0) {
      SetCurrentSong(Tracks[Tracks.length - 1]);
      setPlayOrPause(false);
    } else {
      SetCurrentSong(Tracks[CurrentSong.id - 1]);
      setPlayOrPause(false);
    }
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
          console.log("isssue => ", result.positionMillis);
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
    console.log("this is the superId ", trackLenghRef.current);
    if (mounted) {
      console.log("hello there is a call there for this function ");
      LoadAudio();
    }
    console.log("is this excuted ");
    return () => Unload();
  }, [mounted, CurrentSong]);

  const LoadAudio = async () => {
    SetLoaded(false);
    // SetLoading(true);
    const checkLoading = await sound.current.getStatusAsync();
    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync(
          CurrentSong.track,

          {},
          true
        );

        if (result.isLoaded === false) {
          SetLoading(false);
          console.log("Error in Loading Audio");
        } else {
          console.log("  hahaha", result);
          setTrackLength(result.durationMillis / 1000);
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
        // if (!mounted) {
        //   setMounted(true);
        // }
      } catch (error) {
        console.log(error);
        SetLoading(false);
      }
    } else {
      SetLoading(false);
    }
  };

  const LoadAudioFirstTime = async () => {
    console.log("first line should be showed");
    try {
      const result = await sound.current.loadAsync(
        CurrentSong.track,

        { shouldPlay: true },
        true
      );

      if (result.isLoaded === false) {
        setMounted(true);
        console.log("result.isLoaded === false");
      } else {
        console.log(
          "hahaha",
          typeof (result.durationMillis / 1000),
          " the value => ",
          result.durationMillis / 1000
        );
        setTrackLength(result.durationMillis / 1000);
        trackLenghRef.current = result.durationMillis / 1000;
        setMounted(true);
      }
    } catch (error) {
      setMounted(true);
      console.log("catch (error) ", error);
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
    checkForTheFirstTime().then(() => {
      setMounted(true);
      console.log("hello there");
    });
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
  const changeTime = (seconds) => {
    console.log("---------- seconds : ", seconds);
    console.log("---------- trackLength : ", trackLength - seconds);
    var minutesOfTrackLength = Math.floor((trackLength - seconds) / 60);
    var secondesOfTrackLength = ((trackLength - seconds) % 60).toFixed(0);
    var resTrackLength =
      minutesOfTrackLength.toString() + ":" + secondesOfTrackLength.toString();
    var minutes = Math.floor(seconds / 60);
    var secondss = (seconds % 60).toFixed(0);
    var res = minutes.toString() + ":" + secondss.toString();
    console.log("---------- setTimeElapsed : ", secondss);
    setCurrentTime(seconds);
    setTimeElapsed(res);
    setTimeRemaining(res);

    // setTimeElapsed(Moment.utc(seconds * 1000).format("m:ss"));
    // setTimeRemaining(
    //   Moment.utc((trackLength - seconds) * 1000).format("	HH:mm:ss")
    // );
  };
  const PlayFromThisPosition = async (sec) => {
    // if (played) {
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
          // setCurrentTime(seconds);
          sound.current.playAsync();
          setPlayOrPause(true);
        } else {
          console.log("PlayFromThisPosition try here line 238");
          sound.current.setPositionAsync(positionInMillis);
          // setCurrentTime(sec);
          sound.current.playAsync();
          setPlayOrPause(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
    // } else {
    //   console.log("its the first time ");
    //   setPlayed(true);
    // }
  };

  return (
    <View style={styles.container}>
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
          {/* <Text style={[styles.text, { fontSize: 16, marginTop: 8 }]}>
            Pray Up
          </Text>
          <Text>{!Loading ? "Loaded" : "is loading"}</Text> */}
        </View>
      </View>
      <View>
        <Slider
          onValueChange={(seconds) => {
            console.log("hellddo there ", seconds);
            // changeTime();
          }}
          value={currentTime}
          minimumValue={0}
          maximumValue={trackLength}
          trackStyle={styles.track}
          thumbStyle={styles.thumb}
          minimumTrackTintColor="#93A8B3"
          onSlidingComplete={(value) => PlayFromThisPosition(value)}
        />
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
            <FontAwesome5
              name="forward"
              size={32}
              color="#93A8B3"
            ></FontAwesome5>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default PlayerFunct;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EAEAEC",
    paddingBottom: 20,
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
    width: 150,
    height: 120,
    // backgroundColor: "red",
    shadowColor: "#5D3F6A",
    shadowOffset: { height: 15 },
    shadowRadius: 8,
    shadowOpacity: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  cover: {
    width: 200,
    height: 100,
    // borderRadius: 125,
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
