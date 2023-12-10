import {View} from 'react-native';
import Header from '@web-shop/app/src/components/global/Header';
import ItemDetails from '@web-shop/app/src/components/ItemList/ItemDetails';

const Details=({route, navigation})=>{
    return(
        <View>
            <Header navigation={navigation}/>
            <ItemDetails route={route} navigation={navigation}/>
        </View>
    )
}

export default Details;