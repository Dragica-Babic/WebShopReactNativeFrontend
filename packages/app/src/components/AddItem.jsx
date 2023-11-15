
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import { useSelector } from "react-redux";
import CategoryService from "../services/Category.service";
import { Picker } from "@react-native-picker/picker";

const AddItem=()=>{
    const userId=useSelector(state=>state.users.user.id)
    const[categories, setCategories]=useState([])
    const cat=[]
    const[title, setTitle]=useState("");
    const[description, setDescription]=useState("");
    const[price, setPrice]=useState("");
    const[used, setUsed]=useState(false);
    const[location, setLocation]=useState("");
    const[image, setImage]=useState("");
    const[categoryId, setCategoryId]=useState(1);

    useEffect(()=>{
        CategoryService.getCategories({setCategories});
        addCategories();
    }, [])

    const addCategories=()=>{
        for(let i=0; i<categories.length; i++){
            cat.push(
                <Picker.Item label={categories[i].title} value={categories[i].id} />
            )
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.txt}>Dodavanje ponude</Text>
            <TextInput placeholder="Naziv"
                value={title} onChangeText={setTitle}/>
            <TextInput placeholder="Cijena" value={price} onChangeText={setPrice}
                keyboardType="numeric" textContentType="number"/>
            <TextInput placeholder="Lokacija" value={location} onChangeText={setLocation}/>
            
            <TextInput placeholder="Opis" value={description} onChangeText={setDescription}/>
            <View style={styles.category}>
                <Text>Kategorija:</Text>
                <Picker selectedValue={categoryId} 
                onValueChange={(itemValue, itemIndex) =>setCategoryId(itemValue)}>
                    {cat}
                </Picker>
            </View>
            <Pressable>
                <Text>+Dodaj sliku</Text>
            </Pressable>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    txt:{
        fontSize: 18,
        fontWeight:'bold'
    },
    category:{
        flex:1,
        flexDirection:'row',
        maxHeight:50
    }
})

export default AddItem;