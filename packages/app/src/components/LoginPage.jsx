import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
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
                <Pressable onPress={saveCredentials} style={styles.btn}>
                    <Text style={styles.btnText}>Prijavi se</Text>
                </Pressable>
                
            </View>
    )
}

const styles = StyleSheet.create({
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
    btn:{
        width:200,
        backgroundColor:'#0e4a38',
        height:35,
        color:'#fff',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    btnText:{
        fontSize:18,
        color: '#fff'
    }
})

export default LoginPage;