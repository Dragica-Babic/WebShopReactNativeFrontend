import Checkbox from 'expo-checkbox';
import { StyleSheet, View, Text, Pressable, TextInput, Modal } from "react-native";
import { useState } from 'react';
import Alert from '../global/Alert';

const BuyItem = ({ buyItem, onCancel }) => {
    const [cardPaying, setCardPaying] = useState(true);
    const [cardNumber, setCardNumber] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const addCardNumber = (num) => {
        setCardNumber(num.replace("/[^a-z]/g", ''));
    }

    const onOk = () => {
        if (cardPaying && cardNumber.length < 16) {
            setModalVisible(true);
        }
        else {
            buyItem();
        }
    }

    const close = () => {
        setModalVisible(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Način plaćanja</Text>
            </View>
            <View>
                <View style={{ backgroundColor: "green", height: 2, margin: 2 }} />
                <View style={{ margin: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Checkbox disabled={false} value={cardPaying}
                            onValueChange={(val) => setCardPaying(val)}
                            color={'green'} />
                        <Text style={styles.text}>Plaćanje karticom</Text>
                    </View>
                    <TextInput style={styles.input} keyboardType="numeric" readOnly={!cardPaying} onChangeText={(num) => addCardNumber(num)} />
                </View>
                <View style={{ margin: 10, flexDirection: 'row' }}>
                    <Checkbox disabled={false} value={!cardPaying}
                        onValueChange={(val) => setCardPaying(!val)}
                        color={'green'} />
                    <Text style={styles.text}>Plaćanje prilikom preuzimanja</Text>
                </View>
                <View style={{ backgroundColor: "green", height: 2, margin: 2 }} />
                <View style={styles.row}>
                    <Pressable style={styles.btn} onPress={onOk}>
                        <Text style={styles.btnText}>OK</Text>
                    </Pressable>
                    <Pressable style={styles.btn} onPress={onCancel}>
                        <Text style={styles.btnText}>Otkaži</Text>
                    </Pressable>
                </View>
            </View>
            <Modal transparent visible={modalVisible}>
                <Alert title={"Upozorenje"} text={"Unesite ispravan broj kartice!"} onOk={close} />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: '#eee',
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'flex-start',
        height: 200,
        margin: 'auto',
        padding: 30,
        width: 400,
        height: 300
    },
    titleContainer: {
        flexDirection: 'row'
    },
    title: {
        fontSize: 24,
        color: '#0e4a38'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        height: 70,
        justifyContent: 'space-between'
    },
    input: {
        width: 150,
        height: 30,
        borderColor: 'grey',
        borderWidth: 1,
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
    text: {
        fontSize: 16,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default BuyItem;