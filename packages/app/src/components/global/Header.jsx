import { Image, Modal, Pressable, StyleSheet, Text, View, } from "react-native"
import { useState } from "react";
import { logout } from '../../redux/slices/userSlice';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import UpdateUser from "./UpdateUser";

const Header = ({ navigation }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const [modalVisible, setModalVisible] = useState(false);

    const goToStartPage = () => {
        navigation.navigate('Items');
    }

    const onCancel = () => {
        setModalVisible(false);
    }

    return (
        <View style={styles.header}>
            <Text onPress={goToStartPage} style={styles.text}>Web Shop</Text>
            <View style={styles.menu}>
                <Pressable onPress={() => setModalVisible(true)} style={{ marginRight: 30 }}>
                    <Image source={{ uri: 'http://192.168.0.182:8080/uploads/assets/baseline_account_circle_white_24dp.png' }}
                        resizeMode="cover" style={styles.image} />
                </Pressable>
                <Pressable onPress={() => dispatch(logout())}>
                    <Image source={{ uri: 'http://192.168.0.182:8080/uploads/assets/baseline_logout_white_24dp.png' }}
                        resizeMode="cover" style={styles.image} />
                </Pressable>
                <Modal transparent visible={modalVisible} >
                    <UpdateUser user={user} onCancel={onCancel} />
                </Modal>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 24,
        height: 80,
        backgroundColor: '#0e4a38',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontSize: 40,
        color: '#fff'
    },
    image: {
        width: 30,
        height: 30
    },
    menu: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})

export default Header;