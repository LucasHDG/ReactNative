/* eslint-disable camelcase */
import React, { useState } from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import AppLoading from 'expo-app-loading';
import { Button, Image, } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import {
  useFonts,
  Nunito_200ExtraLight,
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';

const animation = require('./assets/1088-shape-types.json');

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_200ExtraLight,
    Nunito_400Regular,
    Nunito_300Light,
    Nunito_700Bold,
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'grey',
    },
    header: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      marginTop: 24,
      justifyContent: 'center',
    },
    footer: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    main: {
      flex: 8,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <LottieView
          autoPlay
          loop
          autoSize
          resizeMode="cover"
          speed={0.5}
          style={{
            width: 400,
            height: 400,
            backgroundColor: 'white',
            position: 'absolute',
          }}
          source={animation}
        />
        <Text style={{
          fontFamily: 'Nunito_700Bold',
          fontSize: 34,
        }}
        >
          Welcome
        </Text>
        <Text style={{
          fontFamily: 'Nunito_400Regular',
          fontSize: 34,
        }}
        >
          on
        </Text>
        <Text
          style={{
            fontFamily: 'Nunito_200ExtraLight',
            fontSize: 34,
          }}
        >
          Places
        </Text>

      </View>
    </View>
  );
}
