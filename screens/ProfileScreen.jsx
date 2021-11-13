import { StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import theme from '../styles/theme.style';
import { IconButton } from '../components';
import { View } from 'react-native-web';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import Firebase from '../config/firebase';

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

export default function ProfileScreen() {
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
