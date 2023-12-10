import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View, Text, Modal, Platform } from "react-native";
import QuestionService from "../../services/Question.service";
import { useSelector } from "react-redux";
import QuestionModal from "./QuestionModal";
import Question from "./Question";

const Questions = ({ itemId, myItem }) => {
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState("");
    const userId = useSelector(state => state.users.user.id);
    const [questionModalVisible, setQuestionModalVisible] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        QuestionService.getQuestions({ itemId, setQuestions });
    }, [refresh])

    const askQuestion = () => {
        if (question !== "") {
            const response = QuestionService.askQuestion({ question, itemId, userId });
            if (response) {
                setQuestions([...questions, response]);
                setQuestion("");
                setQuestionModalVisible(false);
            }
            setRefresh(!refresh);
        }
    }

    const closeQuestionModal = () => {
        setQuestion("");
        setQuestionModalVisible(false);
    }

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.title}>Pitanja</Text>
                <Pressable style={styles.btn} onPress={() => setQuestionModalVisible(true)}>
                    <Text>+Postavi pitanje</Text>
                </Pressable>
                <Modal transparent visible={questionModalVisible}>
                    <QuestionModal inputAction={setQuestion} title="Novo pitanje"
                        action={askQuestion} onClose={closeQuestionModal} placeholder={"Postavi pitanje..."} />
                </Modal>
            </View>
            <View>
                {questions.map((item, index) => {
                    return (
                        <Question key={item.id} item={item} myItem={myItem} />
                    )
                })}

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: Platform.OS === 'android' ? 100 : 200
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
    question: {
        backgroundColor: '#fafafa',
        width: 500,
        height: 80,
        margin: 5
    },
})

export default Questions;