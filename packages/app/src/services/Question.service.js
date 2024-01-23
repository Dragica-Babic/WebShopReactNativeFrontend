import url from '../environment/config.json';

const getQuestions = async ({ itemId }) => {
    try {
        const response = await fetch(url.url + `/questions/${itemId}`);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

const askQuestion = async ({ question, itemId, userId }) => {
    try {
        const response = await fetch(url.url + '/questions', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                question: question,
                itemId: itemId,
                userId: userId
            })
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

const answerQuestion = async ({ answer, question }) => {
    try {
        const id = question.id;
        const response = await fetch(url.url + `/questions/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                question: question.question,
                answer: answer,
                itemId: question.itemId,
                userId: question.userId
            })
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
}

const QuestionService = {
    getQuestions,
    askQuestion,
    answerQuestion
}

export default QuestionService;