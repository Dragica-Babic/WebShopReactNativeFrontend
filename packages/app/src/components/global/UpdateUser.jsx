import { useState } from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import UserService from "../../services/User.service";
import { update } from "../../redux/slices/userSlice";

const UpdateUser = ({ user, onCancel }) => {
    const dispatch = useDispatch();
    const id = user.id;
    const [name, setName] = useState(user?.name);
    const [surname, setSurname] = useState(user?.surname);
    const [username, setUsername] = useState(user?.username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user?.email);
    const [address, setAddress] = useState(user?.address);

    const updateUser = () => {
        const request = {
            ...user,
            "name": name,
            "surname": surname,
            "username": username,
            "password": password,
            "email": email,
            "address": address
        }
        UserService.updateUser(id, request).then((res) => {
            dispatch(update(res));
        })

        onCancel();
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Moji podaci</Text>
            </View>
            <View>
                <View style={{ backgroundColor: "green", height: 2, margin: 2 }} />
                <Text>Ime:</Text>
                <TextInput style={styles.input}
                    value={name}
                    onChangeText={setName}
                />
            </View>
            <View>
                <Text>Prezime:</Text>
                <TextInput style={styles.input}
                    value={surname}
                    onChangeText={setSurname}
                />
            </View>
            <View>
                <Text>Korisničko ime:</Text>
                <TextInput style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                />
            </View>
            <View>
                <Text>Lozinka:</Text>
                <TextInput style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
            </View>
            <View>
                <Text>E-mail adresa:</Text>
                <TextInput style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <View>
                <Text>Adresa:</Text>
                <TextInput style={styles.input}
                    value={address}
                    onChangeText={setAddress}
                />
            </View>
            <View style={styles.row}>
                <Pressable style={styles.btn} onPress={updateUser}>
                    <Text style={styles.btnText}>Izmijeni</Text>
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
        height: 600
    },
    titleContainer: {
        flexDirection: 'row'
    },
    title: {
        fontSize: 24,
        color: '#0e4a38'
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
    input: {
        height: 40,
        width: 200,
        margin: 8,
        borderWidth: 1,
        padding: 5,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        height: 70,
        justifyContent: 'space-between'
    },
})

export default UpdateUser;