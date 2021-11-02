import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
} from 'react-native';
import * as Linking from 'expo-linking';

import { IconButton } from '../components';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e93b81',
    paddingTop: 50,
    paddingHorizontal: 12,
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
    color: '#fff',
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#fff',
  },
});
const auth = Firebase.auth();

export default function HomeScreen() {
  const { user } = useContext(AuthenticatedUserContext);
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
  const HandleCallButton = () => {
    Linking.openURL(`tel://${CallNumber}`);

    // call(args).catch((error) => console.error(error));
  };
  return (
    <View style={styles.container}>
      <StatusBar style="dark-content" />
      <View style={styles.row}>
        <Text style={styles.title}>
          Welcome
          {' '}
          {user.email}
          !
        </Text>
        <IconButton
          name="logout"
          size={24}
          color="#fff"
          onPress={handleSignOut}
        />
      </View>
      <TextInput
        style={{ padding: 10 }}
        value={CallNumber}
        onChangeText={handleNumberChange}
        placeholder="Enter Phone Number here"
        keyboardType="numeric"
      />
      <TouchableOpacity style={{ backgroundColor: '#ffffff', padding: 10 }} onPress={HandleCallButton}>
        <Text>Call</Text>
      </TouchableOpacity>
      <Text style={styles.text}>
        Your UID is:
        {' '}
        {user.uid}
      </Text>
    </View>
  );
}
