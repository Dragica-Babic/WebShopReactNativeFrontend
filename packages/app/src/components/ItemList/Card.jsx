import { StyleSheet, Text, View, Pressable, Image } from "react-native";

const Card = ({ title, price, image, details }) => {

    return (
        <View style={styles.cardContainer}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode="middle" >
                        {title}
                    </Text>
                </View>
                <View style={styles.content}>
                    {(image &&
                        <Image source={{ uri: `http://192.168.0.182:8080/uploads/${image}` }} style={styles.img} />
                    ) || <Image source={{ uri: `http://192.168.0.182:8080/uploads/default-image.jpg` }} style={styles.img} />
                    }
                    <View style={styles.details}>
                        <Text>{price}KM</Text>
                        <Pressable style={styles.btn} onPress={details}>
                            <Text style={styles.btnText}>Detalji</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 5
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 16,
        width: 350,
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        marginBottom: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'green',
        textAlign: 'left',
        width: 300
    },
    content: {
        flex: 1,
        alignItems: 'center',
        width: '100%'
    },
    img: {
        width: 200,
        height: 200
    },
    details: {
        width: '80%',
        padding: 5,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    btn: {
        width: 80,
        backgroundColor: '#0e4a38',
        height: 30,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        color: '#fff',
        fontSize: 16
    }
});

export default Card;