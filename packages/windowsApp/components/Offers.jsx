import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ActiveOffers from '../../../app/src/components/ActiveOffers';
import FinishedOffers from '../../../app/src/components/FinishedOffers';
import ShoppingHistory from '../../../app/src/components/ShoppingHistory';

const Tab = createMaterialTopTabNavigator();

const Offers=({navigation})=>{
    return(
            <Tab.Navigator>
                <Tab.Screen name="Aktivne ponude" component={ActiveOffers}></Tab.Screen>
                <Tab.Screen name="Zavrsene ponude" component={FinishedOffers}></Tab.Screen>
                <Tab.Screen name="Istorija kupovine" component={ShoppingHistory}></Tab.Screen>
            </Tab.Navigator>
    )
}

export default Offers;