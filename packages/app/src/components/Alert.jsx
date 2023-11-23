import { View, StyleSheet, Text, Pressable } from "react-native";


const Alert = ({ title, text, onOk }) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={{margin:10}}>
                <View style={{ backgroundColor: "green", height: 2, margin: 2 }} />
                <Text>{text}</Text>
            </View>
            <View>
                <Pressable style={styles.btn} onPress={onOk}>
                    <Text style={styles.btnText}>OK</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: '#eee',
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'flex-start',
        height: 200,
        margin: 'auto',
        padding: 30,
        width: 400,
        height: 200
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        height: 70,
        justifyContent: 'space-between'
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
    title: {
        fontSize: 24,
        color: '#0e4a38'
    },
})

export default Alert;