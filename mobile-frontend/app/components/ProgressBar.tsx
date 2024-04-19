import React, { useState } from "react";
import theme from "@/constants/theme";
import Slider from "@react-native-community/slider";
import { StyleSheet } from "react-native";

type ProgressBarProps = {
  max: number;
  min: number;
  value: number;
  onChangeProgress?: (progress: number) => void;
};

const ProgressBar = ({max, min, value, onChangeProgress}: ProgressBarProps) => {
  const [isHandling, setIsHandling] = useState(false);
  const [slidingValue, setSlidingValue] = useState(0);

  return (
    <Slider
      style={styles.slider}
      minimumValue={min}
      maximumValue={max}
      value={isHandling ? slidingValue : value}
      onSlidingStart={() => setIsHandling(true)}
      onValueChange={(value) => setSlidingValue(value)}
      onSlidingComplete={(value) => {
        onChangeProgress?.(value);
        setIsHandling(false);
      }}
      minimumTrackTintColor={theme.purple[500]}
      maximumTrackTintColor={theme.black}
      thumbTintColor={theme.purple[500]}
      thumbImage={require("@/assets/images/progress-bar-anchor.png")}
    />
  );
}

const styles = StyleSheet.create({
  slider: {
    width: "100%",
  },
});

export default ProgressBar;
