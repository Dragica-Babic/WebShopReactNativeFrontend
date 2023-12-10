import { StyleSheet, View, Text, Pressable } from "react-native";
import QuestionModal from "./QuestionModal";
import QuestionService from "../../services/Question.service";
import { useState } from "react";
import { Popup } from 'react-native-windows';


const Question = ({ item, myItem }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [answer, setAnswer] = useState("");

    const answerQuestion = ({ item }) => {
        item.answer = answer;
        const question = item;
        QuestionService.answerQuestion({ answer, question });
        closeModal();
    }

    const closeModal = () => {
        setAnswer("");
        setModalVisible(false);
    }

    return (
        <View>
            <View style={styles.question}>
                <Text>{item?.userAccountUsername}</Text>
                <Text>{item?.question}</Text>
                {myItem ? (
                    <View>
                        <Pressable style={styles.btn} onPress={() => setModalVisible(true)}>
                            <Text>Odgovori</Text>
                        </Pressable>
                        <Popup isOpen={modalVisible}>
                            <QuestionModal inputAction={setAnswer} title="Odgovor"
                                action={() => answerQuestion({ item })} onClose={closeModal}
                                placeholder={"Odgovori na pitanje..."} />
                        </Popup>
                    </View>
                ) : null}
            </View>
            {
                item?.answer ? (
                    <View style={styles.answer}>
                        <Text>{item?.answer}</Text>
                    </View>
                ) : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    question: {
        backgroundColor: '#fafafa',
        width: 500,
        height: 80,
        margin: 5
    },
    btn: {
        borderWidth: 1,
        borderColor: '#0e4a38',
        borderRadius: 10,
        width: 150,
        margin: 10,
        height: 25,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    answer: {
        backgroundColor: '#f5f5f5',
        width: 500,
        height: 50,
        marginLeft: 20,
        margin: 5
    }
})

export default Question;