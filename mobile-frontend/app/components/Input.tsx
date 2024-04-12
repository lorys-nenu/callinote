import React from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps } from 'react-native';
import theme from '@/constants/theme';

interface InputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
};

const Input = ({ label, ...props }: InputProps) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput 
    placeholderTextColor={theme.grey[500]}
    {...props} 
    style={styles.input} 
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
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