import { View, StyleSheet, Text, TextInput, Pressable } from "react-native";


const QuestionModal = ({inputAction, title, action, onClose, placeholder}) => {
    return (
        <View style={styles.modal}>
            <View>
                <Text style={styles.modalTitle}>{title}</Text>
            </View>
            
            <View>
                <View style={{ backgroundColor: "green", height: 2, margin:2 }} />
                <TextInput style={styles.input} onChangeText={(val) => inputAction(val)} placeholder={placeholder} placeholderTextColor={"gray"} multiline={true}
                numberOfLines={4} />
            </View>
            <View style={styles.row}>
                <Pressable style={styles.btn} onPress={action}>
                    <Text style={styles.btnText}>OK</Text>
                </Pressable>
                <Pressable style={styles.btn} onPress={onClose}>
                    <Text style={styles.btnText}>Otkaži</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modal: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: '#eee',
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'flex-start',
        height: 200,
        margin: 'auto',
        padding: 30,
        width: 350,
        height: 250
    },
    modalTitle: {
        fontSize: 24,
        color: '#0e4a38'
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
        margin:5
    },
    btnText: {
        fontSize: 16,
        color: '#fff'
    },
    input:{
        width:300,
        borderWidth:1,
        margin:10
    }
})

export default QuestionModal;