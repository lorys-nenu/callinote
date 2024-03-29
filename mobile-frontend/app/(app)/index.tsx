//import liraries
import useAddNote from '@/hooks/useAddNote';
import useGetNotes from '@/hooks/useGetNotes';
import { Stack } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import Button from '../components/Button';

// create a component
const Home = () => {
  const {notes, isLoading} = useGetNotes();
  const { addNote } = useAddNote();

  return (
    <View>
      <Text>Home</Text>
      <Stack.Screen
        options={{ title: 'Home' }}
        />
      <Text>{isLoading ? 'Loading...' : notes?.map(note => note.title).join(', ')}</Text>
      <Button title="Add note" onPress={() => addNote()} />
    </View>
  );
};

//make this component available to the app
export default Home;
