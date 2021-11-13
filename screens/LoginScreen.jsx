import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, Text, View,
} from 'react-native';

import { Button, InputField, ErrorMessage } from '../components';
import Firebase from '../config/firebase';
import theme from '../styles/theme.style';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.BACK,
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: theme.ONBACKTEXT,
    alignSelf: 'center',
    paddingBottom: 24,
  },
});

const auth = Firebase.auth();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onLogin = async () => {
    try {
      if (email !== '' && password !== '') {
        await auth.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark-content" />
      <Text style={styles.title}>Login</Text>
      <InputField
        leftIcon="email"
        placeholder="Enter email"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <InputField
        leftIcon="lock"
        placeholder="Enter password"
        autoCorrect={false}
        secureTextEntry={passwordVisibility}
        textContentType="password"
        rightIcon={rightIcon}
        value={password}
        onChangeText={(text) => setPassword(text)}
        handlePasswordVisibility={handlePasswordVisibility}
      />
      {loginError ? <ErrorMessage error={loginError} visible /> : null}
      <Button
        onPress={onLogin}
        backgroundColor={theme.PRIMARY}
        title="Login"
        titleColor={theme.BACK}
        titleSize={20}
        containerStyle={{
          marginBottom: 24,
        }}
      />
      <Button
        onPress={() => navigation.navigate('Signup')}
        title="Go to Signup"
        backgroundColor={theme.ONBACKTEXT}
      />
    </View>
  );
}
LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
