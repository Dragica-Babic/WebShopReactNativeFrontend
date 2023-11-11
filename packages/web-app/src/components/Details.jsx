import {View} from 'react-native';
import Header from '../../../app/src/components/Header';
import ItemDetails from '../../../app/src/components/ItemDetails';

const Details=({navigation})=>{
    return(
        <View>
            <Header navigation={navigation}/>
            <ItemDetails navigation={navigation}/>
        </View>
    )
}

export default Details;