//import liraries
import Text from '@/app/components/Text';
import { useLocalSearchParams, Stack } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';

// create a component
const NoteDetails = () => {
  const { noteId } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Note Details' }} />
      <Text>{noteId}</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default NoteDetails;
