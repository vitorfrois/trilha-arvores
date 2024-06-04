import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Pressable, BackHandler, ScrollView, FlatList, ActivityIndicator } from 'react-native';
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
        <Stack.Screen
          name="Atividade"
          component={AtividadeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <View style={styles.item}>
        <Pressable
          style={styles.button}
          onPress={() =>
            navigation.navigate('Trilhas')
          }
        >
          <Text style={styles.text}>Lista de Trilhas</Text>
        </Pressable>
      </View>
      <View style={styles.item}>

        <Pressable
          style={styles.button}
          title="Sair"
          onPress={() =>
            BackHandler.exitApp()
          }
        >
          <Text style={styles.text}>Sair</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 3,
    // height: 100,
    marginVertical: 0,
    marginHorizontal: 0
  },
  text: {
    color: 'white',
    fontSize: 20
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: 10,
    elevation: 0,
    height: 80,
    backgroundColor: '#2f4538',
  },
});

const TrilhasScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();
      setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const TrilhaCard = item => {
    return (
      <View style={styles.item}>
        <Pressable
          style={styles.button}
          onPress={() =>
            navigation.navigate('Atividade', { item })
          }
        >
          <Text style={styles.text}>{item.title}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => TrilhaCard(item)}
        />
      )}
    </View>
  );
};

const AtividadeScreen = ({ route, navigation }) => {
  return (
    <Text style={styles.item}>
      {route.params.item.title}, {route.params.item.releaseYear}
    </Text>
  )
}