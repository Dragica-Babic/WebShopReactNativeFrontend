import {View} from 'react-native';
import Header from '../../../app/src/components/Header';
import AllOffers from '../../../app/src/components/AllOffers';

const Offers=({navigation})=>{
    return(
        <View>
            <Header navigation={navigation}/>
            <AllOffers/>
        </View>
    )
}

export default Offers;