import React, { useState } from 'react';
import {
  Button, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PropTypes from 'prop-types';

function HomeScreen({ navigation }) {
  HomeScreen.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };
  const [destination, setDestination] = useState('');
  const [cities, addCity] = useState([{ id: 0, name: 'Paris', seen: 'false' }]);
  const [id, incr] = useState(1);

  const handleTextChange = (e) => {
    setDestination(e);
  };

  const handleButtonPress = () => {
    const cityToAdd = {
      id, name: destination, seen: false,
    };
    addCity([...cities, cityToAdd]);
    setDestination('');
    incr(id + 1);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'grey',
    },
    header: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    footer: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    main: {
      flex: 1,
      backgroundColor: 'grey',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={{ padding: 10 }}
          value={destination}
          onChangeText={handleTextChange}
          placeholder="Enter Destination here"
        />
        <TouchableOpacity style={{ backgroundColor: '#DDDDDD', padding: 10 }} onPress={handleButtonPress}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 6 }}>
        <ScrollView vertical style={styles.main} contentContainerStyle={{ width: '100%', alignItems: 'center' }}>
          {cities.map((e) => <Text key={e.id} style={{ fontSize: 100 }}>{ e.name }</Text>)}
        </ScrollView>
      </View>
      <Button
        title="Go to SecondScreen"
        onPress={() => navigation.navigate('SecondScreen')}
      />
      <View style={styles.footer}><Text>footer</Text></View>
    </View>
  );
}

function SecondScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>hého</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function app() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SecondScreen" component={SecondScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
