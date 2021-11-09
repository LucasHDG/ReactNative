import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, SafeAreaView, ScrollView, Button,
} from 'react-native';
import * as Linking from 'expo-linking';

import { IconButton } from '../components';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';

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
      <SafeAreaView>
        <ScrollView style={styles.scrollView}>
          <FlatList
            data={Contacts}
            renderItem={({ item }) => (
              <Button
                style={styles.item}
                title={item.key + item.number}
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
    </View>
  );
}
