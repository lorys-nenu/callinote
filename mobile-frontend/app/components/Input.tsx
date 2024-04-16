import React from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps } from 'react-native';
import theme from '@/constants/theme';

interface InputProps extends TextInputProps {
  label?: string;
  value: string;
  isInvisible?: boolean;
  containerStyles?: object;
  onChangeText: (text: string) => void;
};

const Input = ({ label, ...props }: InputProps) => (
  <View style={[styles.container, props.containerStyles]}>
    {label && <Text style={styles.label}>{label}</Text>}
    <TextInput 
    placeholderTextColor={theme.grey[500]}
    {...props} 
    style={[styles.input, props.style, props.isInvisible && { backgroundColor: 'transparent' }]} 
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 8,
    margin: 8,
    width: '100%',
  },
  label: {
    color: theme.white,
  },
  input: {
    backgroundColor: theme.grey[900],
    color: theme.white,
    padding: 8,
    width: '100%',
    borderRadius: 4,
  },
});

export default Input;