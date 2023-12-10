import {View} from 'react-native';
import Header from "@web-shop/app/src/components/global/Header"
import AllOffers from "@web-shop/app/src/components/Offers/AllOffers"

const Offers=({navigation})=>{
    return(
        <View>
            <Header navigation={navigation}/>
            <AllOffers/>
        </View>
    )
}

export default Offers;