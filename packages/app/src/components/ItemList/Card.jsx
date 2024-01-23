import { StyleSheet, Text, View, Pressable, Image, Platform } from "react-native";
import url from '../../environment/config.json';

const Card = ({ title, price, image, details }) => {

    return (
        <View style={styles.cardContainer}>
            <View style={styles.card}>
                <View style={styles.content} onPress={details}>
                    {(image &&
                        <Image source={{ uri: `${url.url}/uploads/${image}` }} style={styles.img} />
                    ) || <Image source={{ uri: `${url.url}/uploads/default-image.jpg` }} style={styles.img} />
                    }
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode="middle">{title}</Text>
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
        width:Platform.OS==='android'?190: 200,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        marginBottom: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#0e4a38',
        textAlign: 'left',
        margin:10,
        padding:2
    },
    content: {
        flex: 1,
        alignItems: 'center',
        width: '100%'
    },
    img: {
        width: Platform.OS==='android'? 190: 200,
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