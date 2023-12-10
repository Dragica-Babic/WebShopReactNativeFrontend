import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable, Image, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CategoryService from "../../services/Category.service";
import { Picker } from "@react-native-picker/picker";
import ItemService from "../../services/ItemService.service";
import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';
import { getActiveOffers, getAllItems, setPageValue } from "../../redux/slices/itemSlice";

const AddItem = ({ modalTitle, onCancel, item, editMode }) => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.users.user.id)
    const [categories, setCategories] = useState([])
    const [title, setTitle] = useState(item?.title);
    const [description, setDescription] = useState(item?.description);
    const [price, setPrice] = useState(item ? item?.price : "");
    const [used, setUsed] = useState(item?.used);
    const [location, setLocation] = useState(item?.location);
    const [image, setImage] = useState(null);
    const [categoryId, setCategoryId] = useState(item?.categoryId);

    useEffect(() => {
        CategoryService.getCategories({ setCategories });
    }, [])

    const addCategories = () => {
        return categories.map((category) => {
            return <Picker.Item style={{ color: 'black' }} label={category.title} value={category.id} key={category.id} />
        })
    }

    const setCategory = (value) => {
        if (value != '0') {
            setCategoryId(value);
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    };

    const saveItem = () => {
        if (editMode) {
            const request = {
                ...item,
                "title": title,
                "description": description,
                "price": price,
                "used": used,
                "location": location,
                "categoryId": categoryId,
                "userId": userId,
                "image": item?.image
            }
            ItemService.updateItem(item.id, request).then((res) => {
                dispatch(getActiveOffers({ userId }));
            })
            if (image) {
                ItemService.uploadImage(item.id, image);
            }
        }
        else {
            const request = {
                "title": title,
                "description": description,
                "price": price,
                "used": used,
                "location": location,
                "categoryId": categoryId,
                "userId": userId,
            }
            ItemService.addItem(request).then((res) => {
                if (image) {
                    ItemService.uploadImage(res.id, image);
                }
                dispatch(getActiveOffers({ userId }));

            })
        }
        dispatch(setPageValue(0));
        dispatch(getAllItems);
        onCancel();
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{modalTitle}</Text>
            </View>
            <View style={{ backgroundColor: "green", height: 2, margin: 2 }} />
            <View style={{ margin: 5 }}>
                <Text>Naziv:</Text>
                <TextInput style={styles.input}
                    value={title} onChangeText={setTitle} />
            </View>
            <View style={{ margin: 5 }}>
                <Text>Cijena:</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={price.toString()} onChangeText={setPrice} />
            </View>
            <View style={{ margin: 5 }}>
                <Text>Lokacija:</Text>
                <TextInput style={styles.input} value={location}
                    onChangeText={setLocation} />
            </View>
            <View style={{ marginLeft: 5, }}>
                <Text>Opis:</Text>
                <TextInput style={styles.inputDescription} value={description} multiline={true} numberOfLines={4}
                    onChangeText={setDescription}
                />
            </View>

            <View style={styles.category}>
                <Text>Kategorija:</Text>
                <Picker style={[styles.input, { flex: 1, color: 'black' }]} selectedValue={categoryId}
                    onValueChange={(value, itemIndex) => setCategory(value)} mode="dropdown">
                    <Picker.Item style={{ color: 'black' }} label="Odaberi kategoriju" value='0' key='0' />
                    {addCategories()}
                </Picker>
            </View>
            <View style={{ flexDirection: 'row', margin: 5 }}>
                <Text style={{ marginRight: 10 }}>Korišteno:</Text>
                <Checkbox disabled={false} value={used} color={'green'} onValueChange={(val) => setUsed(val)} />
            </View>
            {Platform.OS !== 'windows' ?
                (<View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                    <Pressable style={styles.imgBtn} onPress={pickImage}>
                        <Text>+Dodaj sliku</Text>
                    </Pressable>
                    {image && <Image source={{ uri: image.uri }} style={{ width: 100, height: 100 }} />}
                </View>) : null
            }
            <View style={{ backgroundColor: "green", height: 2, margin: 2 }} />
            <View style={styles.row}>
                <Pressable style={styles.btn} onPress={saveItem}>
                    <Text style={styles.btnText}>OK</Text>
                </Pressable>
                <Pressable style={styles.btn} onPress={onCancel}>
                    <Text style={styles.btnText}>Otkaži</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderColor: '#eee',
        borderRadius: 10,
        borderWidth: 1,
        margin: 'auto',
        padding: 30,
        width: 400,
        height: Platform.OS === 'windows' ? 500 : 600
    },
    titleContainer: {
        flexDirection: 'row'
    },
    title: {
        fontSize: 24,
        color: '#0e4a38'
    },
    txt: {
        fontSize: 18,
        fontWeight: 'bold',

    },
    category: {
        flex: 1,
        maxHeight: 50,
        margin: 5,
        width: 300,
        color: 'black'
    },
    input: {
        width: 150,
        height: 30,
        borderColor: 'grey',
        borderWidth: 1,
    },
    inputDescription: {
        borderColor: 'grey',
        borderWidth: 1,
    },
    btn: {
        width: 150,
        backgroundColor: '#0e4a38',
        height: 30,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    btnText: {
        fontSize: 16,
        color: '#fff'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        height: 70,
        justifyContent: 'space-between'
    },
    imgBtn: {
        borderWidth: 1,
        borderColor: '#0e4a38',
        borderRadius: 10,
        width: 150,
        margin: 10,
        height: 25,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default AddItem;