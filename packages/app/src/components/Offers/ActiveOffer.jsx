import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import ItemService from "../../services/ItemService.service";
import AddItem from "../Offers/AddItem";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActiveOffers } from "../../redux/slices/itemSlice";
import ModalComponent from '../global/ModalComponent';
import url from '../../environment/config.json';


const ActiveOffer = ({ item }) => {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const userId = useSelector(state => state.users.user.id);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);

    const ConfirmDelete = () => {
        return (
            <View style={styles.modal}>
                <View>
                    <Text style={{ fontSize: 25 }}>Brisanje ponude</Text>
                </View>
                <View style={{ backgroundColor: "green", height: 2, margin: 2 }} />
                <View style={{ marginTop: 20, marginBottom: 20 }}>
                    <Text>Da li želite izbrisati ponudu?</Text>
                </View>
                <View style={{ backgroundColor: "green", height: 2, margin: 2 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Pressable style={styles.btn} onPress={confirmDelete}>
                        <Text style={styles.btnText}>Da</Text>
                    </Pressable>
                    <Pressable style={styles.btn} onPress={() => setConfirmModalVisible(false)}>
                        <Text style={styles.btnText}>Ne</Text>
                    </Pressable>
                </View>
            </View>
        )
    }

    const removeItem = () => {
        setConfirmModalVisible(true);
    }

    const confirmDelete = () => {
        const id = item?.id;
        ItemService.deleteItem({ id }).then(() => {
            dispatch(getActiveOffers({ userId }));
        })
    }

    const onCancel = () => {
        setModalVisible(false);
    }

    const onOk = () => {
        setModalVisible(false);
    }

    return (
        <View style={styles.row}>
            <Pressable onPress={() => setModalVisible(true)}>
                {(item && item.image &&
                    <Image source={{ uri: `${url.url}/uploads/${item?.image}` }} style={styles.img} />
                ) || <Image source={{ uri: `${url.url}/uploads/default-image.jpg` }} style={styles.img} />
                }
            </Pressable>
            <Text>{item.title}</Text>
            <Text>{item.price}KM</Text>

            <Pressable onPress={removeItem}>
                <Image source={{ uri: `${url.url}/uploads/assets/baseline_delete_black_24dp.png` }}
                    resizeMode="cover" style={styles.icon} />
            </Pressable>
            <ModalComponent visible={confirmModalVisible} component={()=><ConfirmDelete />} />

            <ModalComponent visible={modalVisible} component={() => <AddItem modalTitle={"Ažuriranje ponude"} item={item} onCancel={onCancel} editMode={true} onOk={onOk} />} />
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }, img: {
        width: 70,
        height: 70,
        margin: 10
    },
    icon: {
        width: 30,
        height: 30,
        margin: 5
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
    modal: {
        backgroundColor: 'white',
        borderColor: '#eee',
        borderRadius: 10,
        borderWidth: 1,
        margin: 'auto',
        padding: 30,
        width: 400,
        height: 200
    }
})

export default ActiveOffer;