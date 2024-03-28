import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import React, { useEffect, useState } from 'react';

export default function ModalScreen() {
  const [modalTitle, setModalTitle] = useState('')
  const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL

  const getModalTitle = async () => {
    const response = await fetch(backendUrl + '/modal')
    return response.json().then(data => data.title)
  }

  useEffect(() => {
    getModalTitle().then(setModalTitle)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{modalTitle}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/modal.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
