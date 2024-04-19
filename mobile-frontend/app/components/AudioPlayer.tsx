import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Audio, AVPlaybackStatus, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av"
import { Ionicons } from "@expo/vector-icons";
import theme from "@/constants/theme";
import ProgressBar from "./ProgressBar";
import { useKeyboardHeight } from "@/hooks/useKeyboardHeight";

const AudioPlayer = ({ src }: {src: string}) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundData, setSoundData] = useState<AVPlaybackStatus | null>(null);
  const keyboardHeight = useKeyboardHeight();

  const playSound = async () => {
    if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const handleSoundUpdate = (status: AVPlaybackStatus) => {
    setSoundData(status);
  }

  const handleSliderChange = (progress: number) => {
    if (sound) {
      sound.setPositionAsync(progress);
    }
  }

  useEffect(() => {
    (async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: true,
      });

      const { sound } = await Audio.Sound.createAsync(
        { uri: src },
        { shouldPlay: false },
        handleSoundUpdate
      );
      setSound(sound);
    })();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [src]);

  return (
    <View style={[styles.container, {position: "absolute", bottom: keyboardHeight}]}>
      {soundData?.isLoaded && 
        <ProgressBar 
          max={soundData?.playableDurationMillis || 0} 
          min={0} 
          value={soundData.positionMillis} 
          onChangeProgress={handleSliderChange}
        />
        }
      <Pressable onPress={isPlaying ? pauseSound : playSound}>
        <Ionicons
          name={isPlaying ? "pause" : "play"}
          size={24}
          color="white"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.black,
  },
});

export default AudioPlayer;
