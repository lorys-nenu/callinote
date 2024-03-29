//import liraries
import useAddNote from '@/hooks/useAddNote';
import useGetNotes from '@/hooks/useGetNotes';
import { Stack, Link } from 'expo-router';
import React from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import Button from '@/app/components/Button';
import theme from '@/constants/theme';
import NoteListCard from '@/app/components/NoteCard';
import Text from '@/app/components/Text';

// create a component
const Home = () => {
  const {notes, isLoading} = useGetNotes();
  const { addNote } = useAddNote();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ 
          title: 'CalliNote', 
          headerTitleStyle: {color: theme.white},
          headerBackground: () => (
            <View style={{backgroundColor: theme.black, flex: 1}} />
          ),
        }}
        />
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Notes</Text>
        {isLoading ? <Text>Loading...</Text> : notes?.map(note => (
          <NoteListCard style={styles.listItems} key={note.id} note={note} />
        ))}
      </ScrollView>
      <Button title="Add note" onPress={() => addNote()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.black, 
    paddingBottom: theme.padding.md,
  },
  scrollContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.padding.md,
    margin: theme.margin.none,
    width: "100%"
  },
  listItems: {
    marginTop: theme.margin.md,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: theme.margin.md,
  },
});

//make this component available to the app
export default Home;
