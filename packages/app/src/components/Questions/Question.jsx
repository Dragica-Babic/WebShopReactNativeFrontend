import { StyleSheet, View, Text, Pressable, Modal } from "react-native";
import QuestionModal from "./QuestionModal";
import { useState } from "react";

const Question = ({ item, myItem }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [answer, setAnswer] = useState("");

    const closeModal = () => {
        setAnswer("");
        setModalVisible(false);
    }

    return (
        <View>
            <View style={styles.question}>
                <Text style={{ fontSize: 20, margin: 5 }}>{item?.userUsername}</Text>
                <Text style={{ marginLeft: 5 }}>{item?.question}</Text>
                {myItem ? (
                    <View>
                        <Pressable style={styles.btn} onPress={() => setModalVisible(true)}>
                            <Text>Odgovori</Text>
                        </Pressable>
                        <Modal transparent visible={modalVisible} >
                            <QuestionModal onClose={closeModal} item={item} />
                        </Modal>
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
        height: 100,
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