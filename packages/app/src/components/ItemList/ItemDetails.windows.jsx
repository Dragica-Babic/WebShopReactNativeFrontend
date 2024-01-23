import { StyleSheet, View, Text, Image, Pressable, ScrollView, Platform } from "react-native";
import { useState, useEffect } from 'react';
import ItemService from '../../services/ItemService.service'
import { useSelector } from "react-redux";
import Question from '../Questions/Question';
import UserService from "../../services/User.service";
import BuyItem from "./BuyItem";
import Alert from "../global/Alert";
import Header from '../global/Header';
import url from '../../environment/config.json';
import AddQuestionModal from "../Questions/AddQuestionModal";
import QuestionService from "../../services/Question.service";
import { Popup } from "react-native-windows";

const ItemDetails = ({ route, navigation }) => {
    const id = route.params.id;
    const [item, setItem] = useState(null);
    const loggedUserId = useSelector(state => state.users.user.id);
    const [user, setUser] = useState(null)
    const [isMyItem, setIsMyItem] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [questionModalVisible, setQuestionModalVisible] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [refresh, setRefresh]=useState(false);

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
        });

    }, [id])

    const closeQuestionModal = () => {
        setQuestionModalVisible(false);
        setRefresh(!refresh);
    }

    useEffect(() => {
        QuestionService.getQuestions({ itemId: id }).then((res) => {
            setQuestions(res);
    })
    }, [refresh])


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
        <ScrollView>
            {
                Platform.OS === 'windows' ? (<Header navigation={navigation} />) : null
            }
            <View style={styles.descriptionContainer}>
                <View style={styles.imgContainer}>
                    {(item && item.image &&
                        <Image source={{ uri: `${url.url}/uploads/${item?.image}` }} style={styles.img} />
                    ) || <Image source={{ uri: `${url.url}/uploads/default-image.jpg` }} style={styles.img} />
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
                    <Text style={styles.text}>{item?.used ? "Korišteno" : "Novo"}</Text>
                    <Text style={styles.title}>Lokacija</Text>
                    <Text style={styles.text}>{item?.location}</Text>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20 }}>Vlasnik</Text>
                    <Text style={styles.title}>{user?.username}</Text>
                    <Text style={styles.title}>Kontakt: {user?.email}</Text>
                    <Popup isOpen={modalVisible} >
                        <BuyItem buyItem={buyItem} onCancel={onCancel} />
                    </Popup>
                </View>

                <Popup isOpen={alertVisible} >
                    <Alert title={"Informacija"} text={"Uspješno ste kupili proizvod!"} onOk={closeAlert} />
                </Popup>
                <View style={{ marginTop: 30, minWidth: '60%', marginLeft: 10 }}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Pitanja</Text>
                        {!isMyItem ?
                            (<Pressable style={styles.btn} onPress={() => setQuestionModalVisible(true)}>
                                <Text>+Postavi pitanje</Text>
                            </Pressable>) : null
                        }
                        <Popup isOpen={questionModalVisible} >
                            <AddQuestionModal onClose={closeQuestionModal} itemId={id} />
                        </Popup>
                    </View>
                    <View>
                        {questions.map((item, index) => {
                            return (
                                <Question key={item.id} item={item} myItem={isMyItem} />
                            )
                        })}

                    </View>
                </View>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 24,
        flexWrap: 'wrap',
        overflow: 'scroll'

    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
    },
    title: {
        fontSize: 20,
        paddingTop: 5,
        marginLeft: 5,
        marginRight: 5
    },
    text: {
        padding: 5,
        marginLeft: 5,
        maxWidth: 400
    },
    descriptionContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        margin: 10
    },
    imgContainer: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        width: Platform.OS === 'android' ? 300 : 500,
        height: Platform.OS === 'android' ? 300 : 450,
        minWidth: '50%',
        margin: 10
    },
    img: {
        width: Platform.OS === 'android' ? 300 : 500,
        height: Platform.OS === 'android' ? 300 : 450,
    },
    btn: {
        width: 200,
        backgroundColor: '#0e4a38',
        height: 40,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
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
    header: {
        paddingHorizontal: 24,
        height: 80,
        backgroundColor: '#0e4a38',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 40,
        color: '#fff',
        pointerEvents: 'box-only'
    },
    image: {
        width: 30,
        height: 30
    },
    menu: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    description: {
        marginTop: 5,
        minWidth: '45%'
    }
})

export default ItemDetails;