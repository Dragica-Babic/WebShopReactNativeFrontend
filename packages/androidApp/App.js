import { StyleSheet, Pressable, Image, View, Modal } from 'react-native';
import { useState } from 'react';
import LoginPage from '@web-shop/app/src/components/StartPage/LoginPage';
import Items from '@web-shop/app/src/components/ItemList/Items';
import ItemDetails from '@web-shop/app/src/components/ItemList/ItemDetails';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch } from "react-redux";
import AllOffers from '@web-shop/app/src/components/Offers/AllOffers';
import { logout } from '@web-shop/app/src/redux/slices/userSlice'
import UpdateUser from '@web-shop/app/src/components/global/UpdateUser';
import Registration from '@web-shop/app/src/components/StartPage/Registration';

const Stack = createNativeStackNavigator();

const HeaderMenu = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const user = useSelector(state => state.users.user);
  const onCancel = () => {
    setModalVisible(false);
  }
  return (
    <View style={{ flexDirection: "row" }}>
      <Pressable style={{ marginRight: 20 }} onPress={() => setModalVisible(true)} >
        <Image source={{ uri: 'http://192.168.0.182:8080/uploads/assets/baseline_account_circle_white_24dp.png' }}
          resizeMode="cover" style={styles.image} />
      </Pressable>
      <Pressable onPress={() => dispatch(logout())}>
        <Image source={{ uri: 'http://192.168.0.182:8080/uploads/assets/baseline_logout_white_24dp.png' }}
          resizeMode="cover" style={styles.image} />
      </Pressable>
      <Modal transparent visible={modalVisible} >
        <UpdateUser user={user} onCancel={onCancel} />
      </Modal>
    </View>
  )
}

export default function App() {

  const authenticated = useSelector(state => state.users).authenticated
  if (!authenticated) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          title: 'WebShop',
          headerStyle: {
            backgroundColor: '#0e4a38',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          statusBarColor: 'transparent'
        }}>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Registration" component={Registration} />
        </Stack.Navigator>
      </NavigationContainer>

    );
  }
  else {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          title: 'WebShop',
          headerStyle: {
            backgroundColor: '#0e4a38',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShadowVisible: false,
          headerRight: () => (
            <HeaderMenu />
          ),
        }}>
          <Stack.Screen name="Items" component={Items} />
          <Stack.Screen name="Details" component={ItemDetails} />
          <Stack.Screen name="Offers" component={AllOffers} />
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
