import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FlatList, StyleSheet, View, Text, Image, ActivityIndicator } from "react-native";
import ItemService from "../services/ItemService.service";

const FinishedOffers=()=>{
    const[items, setItems]=useState([])
    const[loading, setLoading]=useState(true)
    const userId=useSelector(state=>state.users.user.id)

    useEffect(()=>{
        ItemService.getFinishedOffers({userId, setItems, setLoading})
    }, [])

    return(
        <View>
            {loading ? (
          <ActivityIndicator />
            ) : (
                <FlatList data={items}
             showsHorizontalScrollIndicator={false}
             numColumns={1}
             ItemSeparatorComponent={() => (
                <View style={{ backgroundColor: "green", height: 2, margin:2 }} />
              )}
             keyExtractor={({id}) => id}
             renderItem={({item})=>{
                return(
                    <View style={styles.row}>
                        <Image style={styles.img} source={require(`../images/${item.image}`)} />
                        <Text>{item.title}</Text>
                        <Text>{item.price}KM</Text>
                    </View>
                )
             }}></FlatList>
            )}
        </View>
    )

}

const styles=StyleSheet.create({
    container:{
        display:'flex',
        flex:1,
        flexWrap:'wrap'

    },
    btn:{
        width:200,
        backgroundColor:'#0e4a38',
        height:30,
        color:'#fff',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        margin:10
    },
    btnText:{
        color: '#fff',
        fontSize:16
    },
    row:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }, img:{
        width: 70,
        height:70,
        margin:10
    },
    icon:{
        width:30,
        height:30,
        margin:5
    }
})

export default FinishedOffers;