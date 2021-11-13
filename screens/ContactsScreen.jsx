import {
  StyleSheet, Text, View, FlatList, SafeAreaView, Button,
} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';

import theme from '../styles/theme.style';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { IconButton } from '../components';

const URL = 'https://reactnativecontacts-97d1a-default-rtdb.europe-west1.firebasedatabase.app/';

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
  item: {
    backgroundColor: theme.ONBACK,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  scrollView: {
    marginBottom: 50,
  },
});

const auth = Firebase.auth();

export default function ContactsScreen() {
  const { user } = useContext(AuthenticatedUserContext);
  const [ConctactList, setContact] = useState('');

  const Call = async () => {
    const actualUsers = await Firebase.database(URL).ref('users');
    actualUsers.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data[user.uid] !== undefined) {
        delete data[user.uid];
      }
      setContact(Object.values(data));
    });
  };

  useEffect(() => {
    Call();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      // console.log(error);
    }
  };

  const HandleCallButton = (e, number) => {
    e.preventDefault();
    Linking.openURL(`tel://${number}`);
  };

  function concatNameNumber(name, number) {
    return (`${name}  ${number}`);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark-content" />
      <View style={styles.row}>
        <Text style={styles.title}>
          Contact
        </Text>
        <IconButton
          name="logout"
          size={24}
          color={theme.ONBACKTEXT}
          onPress={handleSignOut}
        />
      </View>
      <SafeAreaView>
        <FlatList
          style={styles.scrollView}
          data={ConctactList}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Button
                title={concatNameNumber(item.name, item.phoneNumber)}
                titleColor={theme.BACK}
                color={theme.ONBACKTEXT}
                onPress={(e) => HandleCallButton(e, item.phoneNumber)}
              >
                Call
              </Button>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    </View>
  );
}
