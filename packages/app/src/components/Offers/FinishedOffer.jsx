import { useState } from "react";
import { View, Pressable, Image, Text, StyleSheet } from "react-native";
import FinishedOfferInfo from "./FinishedOfferInfo";
import ModalComponent from "../global/ModalComponent";
import url from '../../environment/config.json';

const FinishedOffer = ({ item }) => {

    const [modalVisible, setModalVisible] = useState(false);

    const onCancel = () => {
        setModalVisible(false);
    }

    return (
        <Pressable onPress={() => setModalVisible(true)}>
            <View style={styles.row}>
                {(item && item.image &&
                    <Image source={{ uri: `${url.url}/uploads/${item?.image}` }} style={styles.img} />
                ) || <Image source={{ uri: `${url.url}/uploads/default-image.jpg` }} style={styles.img} />
                }
                <Text>{item.title}</Text>
                <Text>{item.price}KM</Text>
                <ModalComponent visible={modalVisible} component={()=><FinishedOfferInfo item={item} onCancel={onCancel} />} />
            </View>
        </Pressable>
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
})

export default FinishedOffer;