import { StyleSheet, View, Text, Image, Platform, Pressable, Modal } from "react-native";
import { useState, useEffect } from 'react';
import ItemService from '../services/ItemService.service'
import { useSelector } from "react-redux";
import Questions from "./Questions";
import UserService from "../services/User.service";
import BuyItem from "./BuyItem";
import Alert from "./Alert";

const ItemDetails = ({ route, navigation }) => {
    const id = route.params.id;
    const [item, setItem] = useState(null);
    const loggedUserId = useSelector(state => state.users.user.id);
    const [user, setUser] = useState(null)
    const [isMyItem, setIsMyItem] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);

    useEffect(() => {

        ItemService.getItemById({ id }).then((res) => {
            setItem(res);
            let userId = res.userId;
            UserService.getUserById({ userId }).then((result) => {
                setUser(result);
                if (loggedUserId === res.userId) {
                    setIsMyItem(true);
                }
            })
        })
    }, [id])

    const buyItem = () => {
        const response = ItemService.buyItem({ id, userId: loggedUserId });
        if (response) {
            setAlertVisible(true);
        }
        setModalVisible(false)
    }

    const onCancel = () => {
        setModalVisible(false);
    }

    const closeAlert = () => {
        setAlertVisible(false);
    }

    return (

        <View style={styles.container}>

            <View style={styles.descriptionContainer}>
                <View style={styles.imgContainer}>
                    {
                        (item && item?.image && <Image style={styles.img} source={require(`../public/${item.image}`)} />)
                        || <Image style={styles.img} source={require(`../public/default-image.jpg`)} />
                    }
                </View>
                <View style={styles.description}>
                    <Pressable onPress={() => setModalVisible(true)} style={styles.btn}>
                        <Text style={styles.btnText}>Kupi</Text>
                    </Pressable>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Osnovne informacije</Text>
                    <Text style={styles.title}>Opis</Text>
                    <Text style={styles.text}>{item?.description}</Text>
                    <Text style={styles.title}>Cijena</Text>
                    <Text style={styles.text}>{item?.price} KM</Text>
                    <Text style={styles.title}>Stanje</Text>
                    <Text style={styles.text}>{item?.used ? "Novo" : "Korišteno"}</Text>
                    <Text style={styles.title}>Lokacija</Text>
                    <Text style={styles.text}>{item?.location}</Text>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20 }}>Vlasnik</Text>
                    <Text style={styles.title}>{user?.accountUsername}</Text>
                    <Text style={styles.title}>Kontakt: {user?.email}</Text>
                    <Modal transparent visible={modalVisible}>
                        <BuyItem buyItem={buyItem} onCancel={onCancel} />
                    </Modal>
                </View>
                <Modal transparent visible={alertVisible}>
                    <Alert title={"Informacija"} text={"Uspješno ste kupili proizvod!"} onOk={closeAlert} />
                </Modal>
            </View>
            <View style={{ margin: 30 }}>
                <Questions itemId={id} myItem={isMyItem} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        padding: 24,
    },
    actions: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
    },
    title: {
        fontSize: 20,
        paddingTop: 5,
        marginLeft: 5
    },
    text: {
        padding: 5,
        marginLeft: 5
    },
    descriptionContainer: {
        flex: 1,
        flexDirection: Platform.OS === 'android' ? 'column' : 'row',
        justifyContent: 'space-between'
    },
    description: {
        flex: 1,

    },
    imgContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    img: {
        width: 500,
        height: 400
    },
    description: {
        flex: 1
    },
    btn: {
        width: 200,
        backgroundColor: '#0e4a38',
        height: 40,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionBtn: {
        width: 100,
        backgroundColor: '#0e4a38',
        height: 30,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        margin: 10
    },
    btnText: {
        fontSize: 20,
        color: '#fff'
    },
})

export default ItemDetails;