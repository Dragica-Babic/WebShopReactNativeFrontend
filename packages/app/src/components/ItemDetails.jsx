import { StyleSheet, View, Text, Image, Pressable, Alert, Modal, Platform } from "react-native";
import {useState, useEffect} from 'react';
import ItemService from '../services/ItemService.service'
import { useSelector } from "react-redux";

const ItemDetails=({route, navigation})=>{
    const id=route.params.id;
    const [item, setItem]=useState(null);
    const userId=useSelector(state=>state.users.user.id);
    const[modalVisible, setModalVisible]=useState(false)

    useEffect(()=>{
        ItemService.getItemById({id, setItem})
    }, [id])

    const buyItem=()=>{
        const response=ItemService.buyItem({id, userId});
        if(response){
            Alert.alert('Uspješno ste kupili proizvod.');
        }
        setModalVisible(false)
        navigation.navigate('Items')
    }
    
    return(
        
        <View style={styles.container}>
            
            <View style={styles.descriptionContainer}>
                <View style={styles.imgContainer}>
                {
                        (item && item?.image &&  <Image style={styles.img} source={{uri: `../images/${item.image}`}}/>)
                        || <Image style={styles.img} source={require('../images/default-image.jpg')} />
                    }
                </View>
                <View style={styles.description}>
                    <Pressable onPress={()=>setModalVisible(true)} style={styles.btn}>
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
                    <Modal transparent visible={modalVisible}>
                        <View style={styles.modal}>
                        <Text>Da li želite kupiti ovaj artikal?</Text>
                        <View style={styles.actions}>
                            <Pressable onPress={()=>buyItem()} style={styles.actionBtn}>
                                <Text style={styles.btnText}>Da</Text>
                            </Pressable>
                            <Pressable onPress={()=>setModalVisible(false)} style={styles.actionBtn}>
                                <Text style={styles.btnText}>Ne</Text>
                            </Pressable>
                        </View></View>
                    </Modal>
                </View>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        display:'flex',
        flexDirection: Platform.OS==='android'?'column':'row',
        padding:24,
    },
    actions:{
        flex:1,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'80%'
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
        flexDirection:Platform.OS==='android'?'column':'row',
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
    actionBtn:{
        width:100,
        backgroundColor:'#0e4a38',
        height:30,
        color:'#fff',
        display:'flex',
        alignItems:'center',
        margin:10
    },
    btnText:{
        fontSize:18,
        color:'#fff'
    },
    modal:{
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: '#eee',
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        height: 200,
        margin: 'auto',
        padding: 30,
        width: 400
    }
})

export default ItemDetails;