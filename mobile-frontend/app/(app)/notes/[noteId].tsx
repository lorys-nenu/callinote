// disabled ts check for now
// @ts-nocheck
//import liraries
import { useLocalSearchParams, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView,Text as RNText, } from 'react-native';
import { useRef, useState } from "react";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import theme from '@/constants/theme';
import useEditNote from '@/hooks/useEditNote';
import useGetNote from '@/hooks/useGetNote';
import useDebouncedCallback from '@/hooks/useDebouncedCallback';

// create a component
const NoteDetails = () => {
  const { noteId } = useLocalSearchParams();
  const { editNote } = useEditNote(noteId);
  const { note } = useGetNote(noteId);

  const richText = useRef();

  const [descHTML, setDescHTML] = useState("");
  const [showDescError, setShowDescError] = useState(false);

  const richTextHandle = (descriptionText) => {
    if (descriptionText) {
      setShowDescError(false);
      setDescHTML(descriptionText);
    } else {
      setShowDescError(true);
      setDescHTML("");
    }
  };

  const submitContentHandle = useDebouncedCallback(async () => {
    const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, "").trim();
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();

      const note = {
        id: noteId,
        HTMLcontent: descHTML,
        unformattedContent: replaceWhiteSpace,
      }
      console.log(note)
      await editNote(note)
  }, 1000);

  useEffect(() => {
    submitContentHandle();
  }, [descHTML]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ 
        title: note?.title ||'Note Details', 
        headerTitleStyle: {color: theme.white},
        headerTransparent: true, 
        headerBackTitle: 'Notes',
        headerTintColor: theme.purple[500],
      }} />
      {note && (
        <View style={styles.richTextContainer}>
        <RichToolbar
          editor={richText}
          selectedIconTint={theme.accent}
          iconTint={theme.white}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.setStrikethrough,
            actions.setUnderline,
            // actions.addMusic,
          ]}
          // iconMap={{
            //   addMusic: MusicIcon,
            // }}
            // addMusic={handleAddMusic}
            style={styles.richTextToolbarStyle}
            />
        <RichEditor
          initialContentHTML={note.HTMLcontent}
          ref={richText}
          onChange={richTextHandle}
          placeholder="Write your cool content here :)"
          androidHardwareAccelerationDisabled={true}
          style={styles.richTextEditorStyle}
          editorStyle={{ backgroundColor: theme.black, color: theme.white }}
          initialHeight={250}
          />
      </View>
      )}
      {showDescError && (
        <RNText>
        Your content shouldn't be empty 🤔
        </RNText>
        )}
        </SafeAreaView>
        
        );
      };
      
      // define your styles
      const styles = StyleSheet.create({
        container: {
    flex: 1,
    height: "100%",
    backgroundColor: theme.black,
    alignItems: "center",
  },

  richTextContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    paddingTop: "20px",
    border: "3px solid red",
  },

  richTextEditorStyle: {
    fontSize: 20,
    height: "100%",
  },

  richTextToolbarStyle: {
    backgroundColor: theme.grey[900],
  },

  errorTextStyle: {
    color: "#FF0000",
    marginBottom: 10,
  },

});


//make this component available to the app
export default NoteDetails;

