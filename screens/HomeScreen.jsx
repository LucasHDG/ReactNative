import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, SafeAreaView, ScrollView, Button,
} from 'react-native';
import * as Linking from 'expo-linking';

import theme from '../styles/theme.style';
import { IconButton } from '../components';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';

const URL = 'https://reactnativecontacts-97d1a-default-rtdb.europe-west1.firebasedatabase.app/';
const Contacts = [
  { key: 'Devin ', number: '0645270761' },
  { key: 'Dan ', number: '0645270761' },
  { key: 'Dominic ', number: '0645270761' },
  { key: 'Jackson ', number: '0645270761' },
  { key: 'James ', number: '0645270761' },
  { key: 'Joel ', number: '0645270761' },
  { key: 'John ', number: '0645270761' },
  { key: 'Jillian ', number: '0645270761' },
  { key: 'Jimmy ', number: '0645270761' },
  { key: 'Julie ', number: '0645270761' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.BACK,
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
  const { user } = useContext(AuthenticatedUserContext);
  const [CallNumber, setNumber] = useState('');
  const [name, setName] = useState('');
  const [users, setUsers] = useState();

  useEffect(() => {
    const actualUser = Firebase.database(URL).ref(`users/${user.uid}`);
    actualUser.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data != null) setName(data.name);
    });
  });
  useEffect(() => {
    const actualUsers = Firebase.database(URL).ref('users');
    actualUsers.on('value', (snapshot) => {
      const data = snapshot.val();
      // if (data != null) setUsers(data); Quand je fais le setState l'app ne répond plus :/ mais en gros faut afficher la liste qui est récupérée cf logs
      console.log("data: ");
      console.log(data);
      console.log("users: ");
      console.log(users);
    });
  });

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
  const handleNewUserInfo = () => {
    const database = Firebase.database(URL);
    database.ref(`users/${user.uid}`).set({
      name: 'ET la ça fonctionne ???',
      phoneNumber: '0695440581',
    });
  };
  const HandleCallButton = (e, number) => {
    e.preventDefault();
    Linking.openURL(`tel://${number}`);

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
          color={theme.ONBACKTEXT}
          onPress={handleSignOut}
        />
      </View>
      <View style={{ backgroundColor: theme.ONBACK }}>
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
      <SafeAreaView>
        <ScrollView style={styles.scrollView}>
          <FlatList
            data={Contacts}
            renderItem={({ item }) => (
              <Button
                style={styles.item}
                title={item.key + item.number}
                titleColor={theme.BACK}
                color={theme.ONBACKTEXT}
                onPress={(e) => HandleCallButton(e, item.number)}
              >
                Call
              </Button>
            )}
          />
        </ScrollView>
      </SafeAreaView>
      <Text style={styles.text}>
        Your UID is:
        {' '}
        {user.uid}
      </Text>
      <Button
        title="Add user info to base"
        titleColor={theme.BACK}
        onPress={handleNewUserInfo}
        color={theme.PRIMARY}
      />
      <Text>
        My name is
        {' '}
        {name}
      </Text>
    </View>
  );
}
