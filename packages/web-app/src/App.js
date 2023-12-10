
import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import 'react-native-gesture-handler';

import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Details from './components/Details';
import { useSelector } from 'react-redux';
import ItemList from './components/ItemList';
import RegistrationPage from './components/RegistrationPage';
import Offers from './components/Offers';

const Stack = createNativeStackNavigator();

function App() {
  const authenticated = useSelector(state => state.users).authenticated

  const linking = {
    config: {
      screens: {
        Login: 'login',
        Registration: 'signup',
        Items: 'items',
        Details: 'items/:id',
        Offers: 'offers'
      },
    }
  }

  if (!authenticated) {
    return (
      <NavigationContainer linking={linking} style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
          <Stack.Screen name="Registration" options={{ headerShown: false }} component={RegistrationPage} />
        </Stack.Navigator>
      </NavigationContainer>

    )
  }
  else {
    return (

      <NavigationContainer linking={linking} style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name="Items" options={{ headerShown: false }} component={ItemList} />
          <Stack.Screen name="Details" options={{ headerShown: false }} component={Details} />
          <Stack.Screen name="Offers" options={{ headerShown: false }} component={Offers} />
        </Stack.Navigator>
      </NavigationContainer>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
  ;


export default App;
