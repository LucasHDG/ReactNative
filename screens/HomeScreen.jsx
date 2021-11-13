import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
} from 'react-native';
import * as Linking from 'expo-linking';

import theme from '../styles/theme.style';
import { IconButton } from '../components';
import Firebase from '../config/firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.BACK,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: theme.ONBACKTEXT,
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    color: theme.ONBACKTEXT,
  },
});

const auth = Firebase.auth();

export default function HomeScreen() {
  const [CallNumber, setNumber] = useState('');

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      // console.log(error);
    }
  };

  const handleNumberChange = (e) => {
    setNumber(e);
  };

  const HandleCallButton = (e) => {
    e.preventDefault();
    Linking.openURL(`tel://${CallNumber}`);

    // call(args).catch((error) => console.error(error));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark-content" />
      <View style={styles.row}>
        <Text style={styles.title}>
          Home
        </Text>
        <IconButton
          name="logout"
          size={24}
          color={theme.ONBACKTEXT}
          onPress={handleSignOut}
        />
      </View>
      <View style={{ backgroundColor: theme.ONBACK, marginBottom: 20 }}>
        <TextInput
          style={{ padding: 10 }}
          value={CallNumber}
          onChangeText={handleNumberChange}
          placeholder="Enter Phone Number here"
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity
        style={{ backgroundColor: theme.PRIMARY, padding: 10 }}
        onPress={HandleCallButton}
      >
        <Text color={theme.BACK}>Call</Text>
      </TouchableOpacity>
    </View>
  );
}
