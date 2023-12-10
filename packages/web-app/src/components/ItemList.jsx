import Header from "@web-shop/app/src/components/global/Header"
import Items from "@web-shop/app/src/components/ItemList/Items"
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