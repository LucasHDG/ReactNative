import { StyleSheet, Text } from 'react-native';
import theme from '../styles/theme.style';
import Firebase from '../config/firebase';
import React, { useContext } from 'react';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { View } from 'react-native-web';
import { StatusBar } from 'expo-status-bar';
import { IconButton } from '../components';

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
});

const auth = Firebase.auth();

export default function ContactsScreen() {
  const { user } = useContext(AuthenticatedUserContext);

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
    </View>
  );
}
