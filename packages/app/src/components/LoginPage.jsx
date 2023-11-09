import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/userSlice";


const LoginPage = ({navigation}) => {
    const dispatch=useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
      });

      useEffect(()=>{
        const { username } = credentials;
        if(!username) return;
        dispatch(login(credentials));
    },[credentials, dispatch])
   
    const saveCredentials=()=>{
        setCredentials({"username":username, "password":password})
    }

    return (
        <View style={styles.parent}>
            <View style={styles.header}>
                <Text style={styles.text}>Web Shop</Text>
            </View>
            <View style={styles.container}>
                    <Text>Prijava na sistem</Text>
                    <TextInput style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Korisnicko ime"
                    secureTextEntry={false}
                />
                <TextInput style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Lozinka"
                    secureTextEntry={true}
                />
                <Button title="Prijavi se" color={'#0e4a38'}
                onPress={() => saveCredentials()}></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    parent: {
        flex: 1
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex:1
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    btn: {
        color: '#fff',
        backgroundColor: '#0e4a38',
        width: 200,
    },
    header: {
        
        paddingHorizontal: 24,
        height: 80,
        backgroundColor: '#0e4a38',
        justifyContent:'space-between'
    },
    text: {
        paddingTop:14,
        fontSize: 40,
        color: '#fff'
    }
})

export default LoginPage;