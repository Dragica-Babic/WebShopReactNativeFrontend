import {View} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ActiveOffers from './ActiveOffers';
import FinishedOffers from './FinishedOffers';
import ShoppingHistory from './ShoppingHistory';


const Tab = createMaterialTopTabNavigator();

const AllOffers=()=>{
    return(
        <View>
            <Tab.Navigator>
                <Tab.Screen name="Aktivne ponude" component={ActiveOffers}></Tab.Screen>
                <Tab.Screen name="Zavrsene ponude" component={FinishedOffers}></Tab.Screen>
                <Tab.Screen name="Istorija kupovine" component={ShoppingHistory}></Tab.Screen>
            </Tab.Navigator>
        </View>
    )
}

export default AllOffers;