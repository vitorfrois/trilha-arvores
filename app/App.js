import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, BackHandler, ScrollView, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Início' }}
        />
        <Stack.Screen
          name="Trilhas"
          component={TrilhasScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <Button
        title="Lista de Trilhas"
        onPress={() =>
          navigation.navigate('Trilhas')
        }
      />
      <Button
        title="Sair"
        onPress={() =>
          BackHandler.exitApp()
        }
      />
    </>
  );
};
const TrilhasScreen = () => {
  const data = getTrilhas();
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => <Text> {item.title} </Text>}
      />
    </View>
  );
};

const TrilhaCard = ({})

const getTrilhas = () => {
  return fetch('https://reactnative.dev/movies.json')
    .then(response => response.json())
    .then(json => {
      return json.movies;
    })
    .catch(error => {
      console.error(error);
    });
};


