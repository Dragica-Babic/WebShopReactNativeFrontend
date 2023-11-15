
import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Details from './components/Details';
import { useSelector } from 'react-redux';
import Offers from './components/Offers';
import ItemList from './components/ItemList';

const Stack = createNativeStackNavigator();

function App() {
  const authenticated=useSelector(state=>state.users).authenticated

  const linking={
    config:{
      screens: {
        Login: 'login',
        Items:'items',
        Details:'items/:id',
        Offers:'offers'
      },
    }
  }
  
  if(!authenticated){
    return(
      <NavigationContainer linking={linking} style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name="Login" options={{headerShown:false}} component={Login}/>
        </Stack.Navigator>
      </NavigationContainer>
      
    )
  }

  return (
    
    <NavigationContainer linking={linking} style={styles.container}>
      <Stack.Navigator>
          <Stack.Screen name="Items" options={{headerShown: false}} component={ItemList} />
          <Stack.Screen name="Details" options={{headerShown: false}} component={Details} />
          <Stack.Screen name="Offers" options={{headerShown: false}} component={Offers} />
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
