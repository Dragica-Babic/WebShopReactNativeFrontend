import { StyleSheet, View, Pressable, ImageBackground, Text, Image } from 'react-native';
import LoginPage from '../app/src/components/LoginPage';
import Items from '../app/src/components/Items';
import ItemDetails from '../app/src/components/ItemDetails';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch } from "react-redux";
import AllOffers from '../app/src/components/AllOffers';
import { logout } from '../app/src/redux/slices/userSlice'

const Stack = createNativeStackNavigator();

export default function App() {
  const dispatch = useDispatch();
  const authenticated = useSelector(state => state.users).authenticated
  if (!authenticated) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginPage} options={{
            title: 'WebShop',
            headerStyle: {
              backgroundColor: '#0e4a38',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }} />
        </Stack.Navigator>
      </NavigationContainer>

    );
  }
  else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Items" component={Items} options={{
            title: 'WebShop',
            headerStyle: {
              backgroundColor: '#0e4a38',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <Pressable onPress={() => dispatch(logout())}>
                <ImageBackground source={require('./assets/baseline_logout_white_24dp.png')}
                  resizeMode="cover" style={styles.image} />
              </Pressable>

            ),
          }} />
          <Stack.Screen name="Details" component={ItemDetails} options={{
            title: 'WebShop',
            headerStyle: {
              backgroundColor: '#0e4a38',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              
                <Pressable onPress={() => dispatch(logout())}>
                  <ImageBackground source={require('./assets/baseline_logout_white_24dp.png')}
                    resizeMode="cover" style={styles.image} />
                </Pressable>
            ),
          }} />
          <Stack.Screen name="Offers" component={AllOffers} options={{
            title: 'WebShop',
            headerStyle: {
              backgroundColor: '#0e4a38',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
                <Pressable onPress={() => dispatch(logout())}>
                  <ImageBackground source={require('./assets/baseline_logout_white_24dp.png')}
                    style={styles.image} />
                </Pressable>
            ),
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 30,
    width: 30
  }
});
