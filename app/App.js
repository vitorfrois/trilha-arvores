import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, BackHandler, ScrollView, FlatList, ActivityIndicator } from 'react-native';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
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
    const buttonName = item.name;
    return (
      <Button 
        title='Botão'
        onPress={() =>
          navigation.navigate('Atividade', {item})
        }>
      </Button>
    );
  };

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => TrilhaCard(item)}
        />
      )}
    </View>
  );
};

const AtividadeScreen = ( {route, navigation} ) => {
  return (
    <Text>
      {route.params.item.title}, {route.params.item.releaseYear}
    </Text>
  )
}