import { useEffect, useState } from "react";
import { StyleSheet, View, Platform, TextInput, Pressable, Text } from "react-native";
import { useDispatch } from "react-redux";
import { signup } from "../../redux/slices/userSlice";

const Registration = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [message, setMessage] = useState("");

    const [newUser, setNewUser] = useState({
        name: "",
        surname: "",
        username: "",
        password: "",
        email: "",
        address: ""
    })

    useEffect(() => {
        const { username } = newUser;
        if (!username) return;
        dispatch(signup(newUser));
    }, [newUser, dispatch]);

    const signUp = () => {
        setMessage("");
        if (name !== "" && surname !== "" && username !== "" && password !== "" && email !== "" && address !== "") {
            setNewUser({
                "name": name,
                "surname": surname,
                "username": username,
                "password": password,
                "email": email,
                "address": address
            })
        }
        else {
            setMessage("Sva polja su obavezna!");
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View>
                    <Text>Registracija</Text>
                </View>
                <View>
                    <TextInput style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Ime"
                    />
                </View>
                <View>
                    <TextInput style={styles.input}
                        value={surname}
                        onChangeText={setSurname}
                        placeholder="Prezime"
                    />
                </View>
                <View>
                    <TextInput style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Korisničko ime"
                    />
                </View>
                <View>
                    <TextInput style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Lozinka"
                        secureTextEntry={true}
                    />
                </View>
                <View>
                    <TextInput style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="E-mail adresa"
                    />
                </View>
                <View>
                    <TextInput style={styles.input}
                        value={address}
                        onChangeText={setAddress}
                        placeholder="Adresa"
                    />
                </View>
                <View>
                    <Pressable style={styles.btn} onPress={signUp}>
                        <Text style={styles.btnText}>Registruj se</Text>
                    </Pressable>
                </View>
                <View>
                    <Text style={{ color: "red" }}>{message}</Text>
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Platform.OS === 'web' ? '87vh' : '100%',
        backgroundColor: '#f5f5f5'
    },
    input: {
        height: 40,
        width: 200,
        margin: 8,
        borderWidth: 1,
        padding: 5,
    },
    btn: {
        width: 200,
        backgroundColor: '#0e4a38',
        height: 35,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontSize: 18,
        color: '#fff'
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 16,
        width: 350,
        height: 500,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Registration;