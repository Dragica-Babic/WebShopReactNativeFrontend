import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import UserService from "../../services/User.service";

const FinishedOfferInfo = ({ item, onCancel }) => {
    const customerId = item?.customerId;
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        UserService.getUserById({ userId: customerId }).then((res) => {
            setCustomer(res);
        })
    }, [item])

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Detalji</Text>
            </View>
            <View>
                <View style={{ backgroundColor: "green", height: 2, margin: 2 }} />
                <Text style={styles.description}>Naziv</Text>
                <Text style={styles.text}>{item.title}</Text>
            </View>
            <View>
                <Text style={styles.description}>Opis</Text>
                <Text style={styles.text}>{item.description}</Text>
            </View>
            <View>
                <Text style={styles.description}>Cijena</Text>
                <Text style={styles.text}>{item.price}</Text>
            </View>
            <View>
                <Text style={styles.description}>Kupac</Text>
                <Text style={styles.text}>{customer?.username}</Text>
                <Text style={styles.text}>{customer?.email}</Text>
                <Text style={styles.text}>{customer?.address}</Text>
            </View>
            <View>
                <Pressable style={styles.btn} onPress={onCancel}>
                    <Text style={styles.btnText}>OK</Text>
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
        height: 450
    },
    titleContainer: {
        flexDirection: 'row'
    },
    title: {
        fontSize: 24,
        color: '#0e4a38'
    },
    description: {
        fontSize: 20,
        paddingTop: 5,
        marginLeft: 5,
        marginRight: 5
    },
    text: {
        padding: 5,
        marginLeft: 5
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
})

export default FinishedOfferInfo;