import { Text } from 'react-native';
import LoginPage from '@web-shop/app/src/components/StartPage/LoginPage';
import Items from '@web-shop/app/src/components/ItemList/Items.windows';
import ItemDetails from '@web-shop/app/src/components/ItemList/ItemDetails';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ActiveOffers from '@web-shop/app/src/components/Offers/ActiveOffers';
import FinishedOffers from '@web-shop/app/src/components/Offers/FinishedOffers';
import ShoppingHistory from '@web-shop/app/src/components/Offers/ShoppingHistory';
import Registration from '@web-shop/app/src/components/StartPage/Registration';

const Stack = createNativeStackNavigator();

export default function App() {

  const authenticated = useSelector(state => state.users).authenticated
  if (!authenticated) {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            title: 'WebShop', headerShown: true, headerBackVisible: true,
            headerRight: () => {
              <Text>Tekst</Text>
            }
          }}>
            <Stack.Screen name="Login" component={LoginPage} options={{ title: 'Naslov' }} />
            <Stack.Screen name="Registration" component={Registration} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
  else {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Items" component={Items} />
            <Stack.Screen name="Details" component={ItemDetails} />
            <Stack.Screen name="ActiveOffers" component={ActiveOffers} />
            <Stack.Screen name='FinishedOffers' component={FinishedOffers} />
            <Stack.Screen name='History' component={ShoppingHistory} />
          </Stack.Navigator>
        </NavigationContainer></SafeAreaProvider>
    )
  }
}
