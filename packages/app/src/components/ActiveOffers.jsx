import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View, Text, ImageBackground, Image, ActivityIndicator, Modal } from "react-native";
import { useSelector } from "react-redux";
import ItemService from "../services/ItemService.service";
import Header from "./Header";
import AddItem from "./AddItem";


const ActiveOffers=()=>{
    const[items, setItems]=useState([])
    const[loading, setLoading]=useState(true)
    const userId=useSelector(state=>state.users.user.id)
    const[modalVisible, setModalVisible]=useState(false)

    useEffect(()=>{
        ItemService.getActiveOffers({userId, setItems, setLoading})
    }, [])

    return(
        <View style={styles.container}>
            <Pressable onPress={()=>setModalVisible(true)} style={styles.btn} >
                <Text style={styles.btnText}>+Dodaj ponudu</Text>
            </Pressable>

            <Modal visible={modalVisible} animationType="slide" 
                onRequestClose={() => { setModalVisible(!modalVisible);}}>
                <AddItem />
            </Modal>
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
                        
                        <Text>{item.title}</Text>
                        <Text>{item.price}KM</Text>
                        <Pressable>
                            <ImageBackground source={require('../assets/baseline_delete_black_24dp.png')}
                                resizeMode="cover" style={styles.icon} />
                        </Pressable>

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

export default ActiveOffers;