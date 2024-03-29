//import liraries
import React from 'react';
import { Text as NativeText, StyleSheet, TextProps } from 'react-native';
import theme from '@/constants/theme';

// create a component
const Text = (props: TextProps) => {
  return (
    <NativeText {...props} style={[styles.text, props.style]} />
  );
};

// define your styles
const styles = StyleSheet.create({
  text: {
    color: theme.white,
  }
});

//make this component available to the app
export default Text;
