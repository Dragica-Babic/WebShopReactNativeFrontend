import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable, Platform, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import Header from "../global/Header";

const LoginPage = ({ navigation }) => {
    const dispatch = useDispatch();
    const authFailed = useSelector(state => state.users.authenticationFailed);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        const { username } = credentials;
        if (!username) return;
        dispatch(login(credentials));
    }, [credentials, dispatch])

    const saveCredentials = () => {
        setMessage("");
        if (username !== "" && password !== "") {
            setCredentials({ "username": username, "password": password });
        }
        else {
            setMessage("Unesite korisničko ime i lozinku!");
        }
    }

    const goToRegistration = () => {
        navigation.navigate("Registration");
    }

    return (
        <View>
            {Platform.OS==='windows'?(
                <Header navigation={navigation} />
            ):null}
        <View style={styles.container}>
            
            <View style={styles.content}>
                <View>
                    <Text style={{ color: "black" }}>Prijava na sistem</Text>
                </View>
                <View>
                    <TextInput style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Korisnicko ime"
                        secureTextEntry={false}
                        placeholderTextColor={'gray'}
                    />
                </View>
                <View>
                    <TextInput style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Lozinka"
                        secureTextEntry={true}
                        placeholderTextColor={'gray'}
                    />
                </View>
                <View>
                    <Pressable onPress={saveCredentials} style={styles.btn}>
                        <Text style={styles.btnText}>Prijavi se</Text>
                    </Pressable>
                    <View style={{ backgroundColor: "gray", height: 2, marginTop: 20, marginBottom: 20 }} />
                </View>
                <View>
                    <Pressable style={styles.regBtn} onPress={goToRegistration}>
                        <Text style={{ color: 'black' }}>Registruj se</Text>
                    </Pressable>
                </View>
                <View>
                    <Text style={{ color: "red" }}>{message}</Text>
                    {authFailed ? (
                        <View>
                            <Text style={{ color: "red" }}>Pogrešno korisničko ime ili lozinka!</Text>
                        </View>
                    ) : null}
                </View>
            </View>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        height: Dimensions.get('window').height - 80
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'black'
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
    regBtn: {
        marginTop: 10,
        width: 200,
        backgroundColor: '#fff',
        height: 35,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black'
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 16,
        width:350,
        height:350,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default LoginPage;