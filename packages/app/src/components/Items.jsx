import { FlatList, StyleSheet, View, ActivityIndicator, Platform } from "react-native";
import { useState, useEffect } from "react";
import Card from './Card'
import ItemService from '../services/ItemService.service'

const Items=({navigation})=>{
    const[items, setItems]=useState([])
    const [isLoading, setLoading] = useState(true);
    const [col, setCol]=useState(3);


    useEffect(() => {
        ItemService.getItems({setLoading, setItems});
      }, []);

      const goToDetails=({item})=>
         navigation.navigate('Details', {
          id:item.id
        })

    useEffect(()=>{
      Platform.OS==='android'?setCol(2):setCol(3);
    }, [Platform.OS])
      

    return(
      <View>
        <View style={{flex: 1, padding: 24}}>
          {isLoading ? (
          <ActivityIndicator />
            ) : (
          <View style={styles.container} >
            <FlatList data={items}
            showsHorizontalScrollIndicator={false}
             numColumns={col}
             key={col}
             keyExtractor={({id}) => id}
             renderItem={({item})=>{
             
             return(
              <Card title={item.title} price={item.price} 
              image={item.image} description={item.description} location={item.location}
              details={()=>goToDetails({item})} />
              )
             }}></FlatList>
        </View>
      )}
      </View>
      </View>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"row"
    }, 
})

export default Items;