
import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import Items from '../app/src/components/Items'
import ItemDetails from '../app/src/components/ItemDetails'
import Offers from './components/Offers';


const Stack = createNativeStackNavigator();

function App() {
  const authenticated=useSelector(state=>state.users).authenticated
  
  if(!authenticated){
    return(
      <Login />
    )
  }

  return (
    
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
          <Stack.Screen name="Items" component={Items} />
          <Stack.Screen name="Details" component={ItemDetails} />
          <Stack.Screen name="Offers" component={Offers} />
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
