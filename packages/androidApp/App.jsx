

import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import LoginPage from '../../app/src/components/LoginPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Items from '../../app/src/components/Items';
import ItemDetails from '../../app/src/components/ItemDetails';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

function App() {
  const {authenticated}=useSelector(state=>state.users)

  const linking={
    config:{
      screens: {
        Login: 'login',
        Items:'items',
        Details:'details'
      },
    }
  }

  return (
    <NavigationContainer linking={linking} style={styles.container}>
      <Stack.Navigator>
        {authenticated ? (
          <>
        <Stack.Screen name="Items"  component={Items} />
        <Stack.Screen name="Details" component={ItemDetails} />
        </>
        ) :
        (
          <Stack.Screen name="Login"  component={LoginPage} />
        )}

      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
});

export default App;
