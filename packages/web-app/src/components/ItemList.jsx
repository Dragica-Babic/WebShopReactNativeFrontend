import Header from "../../../app/src/components/Header";
import Items from "../../../app/src/components/Items";
import {View} from 'react-native';


const ItemList=({navigation})=>{
    return(
        <View>
            <Header navigation={navigation}/>
            <Items navigation={navigation}/>
        </View>
    )
}

export default ItemList;