import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import {useState, useEffect} from 'react';
import ItemService from '../services/ItemService.service'

const ItemDetails=({route, navigation})=>{
    const id=route.params.id;
    const [item, setItem]=useState(null);

    useEffect(()=>{
        ItemService.getItemById({id, setItem})
    }, [id])
    
    return(
        
        <View style={styles.container}>
            
            <View style={styles.descriptionContainer}>
                <View style={styles.imgContainer}>
                    {
                        (item && item?.image && <Image style={styles.img} source={require(`../images/${item?.image}`)}/> )
                        || <Image style={styles.img} source={require('../images/default-image.jpg')} />
                    }
                    
                </View>
                <View style={styles.description}>
                    <Pressable style={styles.btn}>
                        <Text style={styles.btnText}>Kupi</Text>
                    </Pressable>
                    <Text style={styles.title}>Opis</Text>
                    <Text style={styles.text}>{item?.description}</Text>
                    <Text style={styles.title}>Cijena</Text>
                    <Text style={styles.text}>{item?.price} KM</Text>
                    <Text style={styles.title}>Stanje</Text>
                    <Text style={styles.text}>{item?.used?"Novo":"Korišteno"}</Text>
                    <Text style={styles.title}>Lokacija</Text>
                    <Text style={styles.text}>{item?.location}</Text>
                </View>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        display:'flex',
        flexDirection:'row',
        padding:24
    },
    title:{
        fontSize: 20,
        paddingTop:5
    },
    text:{
        padding:5
    },
    descriptionContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    description:{
        flex:1,

    },
    imgContainer:{
       flex:1,
       flexDirection:'row',
       flexWrap:'nowrap',
    },
    img:{
        width: 500,
        height:400
    },
    description:{
        flex:1
    },
    btn:{
        width:200,
        backgroundColor:'#0e4a38',
        height:40,
        color:'#fff',
        display:'flex',
        alignItems:'center'
    },
    btnText:{
        fontSize:24,
        color:'#fff'
    }
})

export default ItemDetails;