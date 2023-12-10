import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ActiveOffers from './ActiveOffers';
import FinishedOffers from './FinishedOffers';
import ShoppingHistory from './ShoppingHistory';

const Tab = createMaterialTopTabNavigator();

const AllOffers = () => {
    return (

        <Tab.Navigator style={{ height: '100%' }}>
            <Tab.Screen name="Aktivne ponude" component={ActiveOffers} />
            <Tab.Screen name="Završene ponude" component={FinishedOffers} />
            <Tab.Screen name="Istorija kupovine" component={ShoppingHistory} />
        </Tab.Navigator>
    )
}

export default AllOffers;