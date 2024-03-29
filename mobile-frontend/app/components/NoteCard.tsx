//import liraries
import { type Note } from '@/constants/Note';
import theme from '@/constants/theme';
import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Text from './Text';
import { Link } from 'expo-router';

type NoteListCardProps = {
  note: Note;
};

// create a component
const NoteListCard = ({ note, style,...rest } : NoteListCardProps & TouchableOpacityProps) => {
  return (
    <Link style={[styles.container, style]} asChild href={{pathname: "/(app)/notes/[noteId]", params: {noteId: note.id}}} onPress={() => console.log("pressing")}>
      <TouchableOpacity {...rest}>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={{color: note.content ? "white" : theme.grey[100]}}>{note.content || "This note is currently empty"}</Text>
    </TouchableOpacity>
    </Link>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: theme.grey[900],
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.padding.lg,
    paddingVertical: theme.padding.md,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

//make this component available to the app
export default NoteListCard;
