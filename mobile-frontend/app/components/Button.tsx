//import liraries
import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, GestureResponderEvent, Text } from 'react-native';
import theme from '@/constants/theme';

type ButtonProps = {
  title: string;
  onPress: (event?: GestureResponderEvent) => void;
  shouldForwardPressEvent?: boolean;
  touchableOpacityProps?: TouchableOpacityProps;
};

const Button = ({title, onPress, shouldForwardPressEvent, touchableOpacityProps}: ButtonProps) => {
  const handlePress = (event: GestureResponderEvent) => {
    event.stopPropagation();
    if (shouldForwardPressEvent) {
      onPress(event);
    }

    onPress();
  }
  return (
    <TouchableOpacity 
      onPress={handlePress} 
      style={styles.button}
      activeOpacity={0.8}
      {...touchableOpacityProps}
    >
      <Text
        style={{color: "#fff"}}
      >{title}</Text>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  button: {
    display: 'flex',
    backgroundColor: theme.purple[700],
    paddingVertical: theme.padding.md,
    paddingHorizontal: theme.padding.lg,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    marginHorizontal: theme.margin.sm,
  },
});

//make this component available to the app
export default Button;
