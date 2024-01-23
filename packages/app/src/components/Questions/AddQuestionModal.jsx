import { useState } from "react";
import { View, StyleSheet, Text, TextInput, Pressable } from "react-native";
import { useSelector } from "react-redux";
import QuestionService from "../../services/Question.service";

const AddQuestionModal = ({onClose, itemId}) => {
    const [question, setQuestion]=useState("");
    const userId=useSelector(state=>state.users.user.id);

    const addQuestion=()=>{
        QuestionService.askQuestion({question, itemId, userId});
        onClose();
    }

    return (
        <View style={styles.modal}>
            <View>
                <Text style={styles.modalTitle}>Novo pitanje</Text>
            </View>

            <View>
                <View style={{ backgroundColor: "green", height: 2, margin: 2 }} />
                <TextInput style={styles.input} onChangeText={(val) => setQuestion(val)} placeholder="Postavi pitanje..." placeholderTextColor={"gray"} multiline={true}
                    numberOfLines={4} />
            </View>
            <View style={styles.row}>
                <Pressable style={styles.btn} onPress={addQuestion}>
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
        justifyContent: 'space-between',
        margin:'auto',
        padding: 30,
        width: 450,
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
        margin: 5
    },
    btnText: {
        fontSize: 16,
        color: '#fff'
    },
    input: {
        width: 300,
        borderWidth: 1,
        margin: 10,
        height:67,
        padding:10
    }
})

export default AddQuestionModal;