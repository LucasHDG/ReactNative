import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';

import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';
import AuthStack from './AuthStack';
import App from './HomeStack';

const auth = Firebase.auth();

export default function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = auth.onAuthStateChanged(async (authenticatedUser) => {
      try {
        await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    });

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootSiblingParent>
        {user ? <App /> : <AuthStack />}
      </RootSiblingParent>
    </NavigationContainer>
  );
}
