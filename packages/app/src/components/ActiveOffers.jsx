import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import ItemService from "../services/ItemService.service";


const ActiveOffers=()=>{
    const[items, setItems]=useState([])
    const[loading, setLoading]=useState(true)
    const id=useSelector(state=>state.users).user.id;

    useEffect()

    return(
        <View style={styles.container}>
            <Pressable style={styles.btn}>
                <Text style={styles.btnText}>+Dodaj ponudu</Text>
            </Pressable>
            <FlatList></FlatList>
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
        width:80,
        backgroundColor:'#0e4a38',
        height:30,
        color:'#fff',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    btnText:{
        color: '#fff',
        fontSize:16
    }
})

export default ActiveOffers;