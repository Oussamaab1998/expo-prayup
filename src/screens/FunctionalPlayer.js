import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
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
      title: "Part-1",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-1.mp3?alt=media&token=a1cbdc4c-95fa-4cdf-9b7f-968b776bdbec",
    },
    {
      id: 1,
      title: "Part-2",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-2.mp3?alt=media&token=70943399-6a5e-4411-8e7d-3147267bde20",
    },
    {
      id: 2,
      title: "Part-3",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-3.mp3?alt=media&token=274a56f8-a176-4df5-a7d4-4a4c16457def",
    },
    {
      id: 3,
      title: "Part-4",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-4.mp3?alt=media&token=dc3831ae-b23a-4f1d-8bbb-2d250ba25dd0",
    },
    {
      id: 4,
      title: "Part-5",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-5.mp3?alt=media&token=f4dda6d9-af2c-4818-9c82-fea11831ae2a",
    },
    {
      id: 5,
      title: "Part-6",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-6.mp3?alt=media&token=61fac86e-322c-4f98-a05f-49d9278663e5",
    },
    {
      id: 6,
      title: "Part-7",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-7.mp3?alt=media&token=d39a93c9-ff33-4b3d-a9ea-f97c94f0c4c6",
    },
    {
      id: 7,
      title: "Part-8",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-8.mp3?alt=media&token=ea08c5b2-d984-4fe3-a459-c1b21ee98b5d",
    },

    {
      id: 8,
      title: "Part-9",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-9.mp3?alt=media&token=e94f7cab-6faf-46aa-b5a8-8680f3845ff3",
    },
    {
      id: 9,
      title: "Part-10",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-10.mp3?alt=media&token=11b8e799-8722-4526-973f-8cc569b033e6",
    },
    {
      id: 10,
      title: "Part-11",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-11.mp3?alt=media&token=f2e59ea4-b4ae-4f6c-8e50-597f203d4367",
    },
    {
      id: 11,
      title: "Part-12",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-12.mp3?alt=media&token=82ab9385-051a-4b80-86fc-22455e14f43b",
    },
    {
      id: 12,
      title: "Part-13",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-13.mp3?alt=media&token=2f544214-c65f-4d1b-83be-0d800d781d82",
    },

    {
      id: 13,
      title: "Part-14",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-14.mp3?alt=media&token=8cc1ff88-2c3f-49e7-90ac-a89cf2e52b5d",
    },

    {
      id: 14,
      title: "Part-15",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-15.mp3?alt=media&token=85bce090-2c6a-419d-a9e8-4bd283efc727",
    },

    {
      id: 15,
      title: "Part-16",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-16.mp3?alt=media&token=f9fe9220-e623-480e-9a79-d20fe734169a",
    },

    {
      id: 16,
      title: "Part-17",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-17.mp3?alt=media&token=f19f7c78-43cd-4b06-95f7-3570f8caf0b7",
    },

    {
      id: 17,
      title: "Part-18",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-18.mp3?alt=media&token=972663cf-81a8-47a4-9311-d40a40473fdd",
    },

    {
      id: 18,
      title: "Part-19",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-19.mp3?alt=media&token=b3205770-f1ab-442a-ad88-7053448545d4",
    },

    {
      id: 19,
      title: "Part-20",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-20.mp3?alt=media&token=cd811dd8-d007-40aa-83a1-4ec110caf2b8",
    },

    {
      id: 20,
      title: "Part-21",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-21.mp3?alt=media&token=ae923e9e-adcb-4e3d-982a-4b03e95ce172",
    },

    {
      id: 21,
      title: "Part-22",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-22.mp3?alt=media&token=c54af80b-04da-48f9-b0c7-3c4f310b1ecb",
    },

    {
      id: 22,
      title: "Part-23",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-23.mp3?alt=media&token=67b42e7c-7b81-4fbe-8dd0-b886ef28f7a7",
    },

    {
      id: 23,
      title: "Part-24",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-24.mp3?alt=media&token=c597274c-063e-4291-8057-ba2f77e90ef5",
    },

    {
      id: 24,
      title: "Part-25",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-25.mp3?alt=media&token=2480af74-d538-4ceb-8a92-baca32222783",
    },

    {
      id: 25,
      title: "Part-26",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-26.mp3?alt=media&token=badc4bf1-b675-4b3a-97f0-bd9adef5dab0",
    },

    {
      id: 26,
      title: "Part-27",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-27.mp3?alt=media&token=09f0e09c-e41d-436a-9e99-5f734d73b6c2",
    },

    {
      id: 27,
      title: "Part-28",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-28.mp3?alt=media&token=c2ff9a17-e027-43a4-8f3d-3b289bbfbdf8",
    },

    {
      id: 28,
      title: "Part-29",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-29.mp3?alt=media&token=cca3f740-d0a8-4077-803f-af7523eaf28c",
    },
    {
      id: 29,
      title: "Part-30",
      track:
        "https://firebasestorage.googleapis.com/v0/b/holyquran-f922b.appspot.com/o/Quran Audio%2FPart-30.mp3?alt=media&token=5c8eb622-cb5e-44b1-90d6-28c830f3b77b",
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
            source={require("../assets/pray.png")}
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
    </View>
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
