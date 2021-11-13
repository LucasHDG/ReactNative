import {
  StyleSheet, Text, View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import Toast from 'react-native-root-toast';

import theme from '../styles/theme.style';
import { IconButton, InputField, Button } from '../components';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import Firebase from '../config/firebase';

const URL = 'https://reactnativecontacts-97d1a-default-rtdb.europe-west1.firebasedatabase.app/';
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
});

const auth = Firebase.auth();

export default function ProfileScreen() {
  const { user } = useContext(AuthenticatedUserContext);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const notify = (message) => {
    Toast.show(message, {
      duration: Toast.durations.SHORT,
    });
  };

  useEffect(() => {
    const dbRef = Firebase.database(URL).ref();
    dbRef.child('users').child(user.uid).get().then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setName(data.name);
        setNumber(data.phoneNumber);
      }
    })
      .catch((error) => {
        notify(error);
      });
  }, []);

  const onSave = () => {
    const database = Firebase.database(URL);
    database.ref(`users/${user.uid}`)
      .set({
        name,
        phoneNumber: number,
      })
      .then(() => notify('Profile updated'))
      .catch((error) => notify(error));
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark-content" />
      <View style={styles.row}>
        <Text style={styles.title}>
          Profile
        </Text>
        <IconButton
          name="logout"
          size={24}
          color={theme.ONBACKTEXT}
          onPress={handleSignOut}
        />
      </View>
      <InputField
        placeholder="Enter your name"
        textContentType="nickname"
        autoFocus
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <InputField
        placeholder="Enter your number"
        keyboardType="number-pad"
        textContentType="telephoneNumber"
        autoFocus
        value={number}
        onChangeText={(text) => setNumber(text)}
      />
      <Button
        onPress={onSave}
        backgroundColor={theme.PRIMARY}
        title="Save"
        titleColor={theme.BACK}
        titleSize={20}
      />
    </View>
  );
}
