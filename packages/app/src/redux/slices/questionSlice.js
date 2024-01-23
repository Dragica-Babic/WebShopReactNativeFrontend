import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import QuestionService from "../../services/Question.service";

const getQuestions = createAsyncThunk("getQuestions", async ({}, {getState}) => {
    try {
        const state=getState();
        const itemId=state.itemId;
        return await QuestionService.getQuestions({ itemId });
    } catch (error) {
        console.log(error);
    }
});

const addQuestion = (state, action) => {
    state.questions = [...state.questions, action.payload];
}

const setItemId=(state, action)=>{
    state.itemId=action.payload;
}

const questionSlice = createSlice({
    name: 'questions',
    initialState: {
        questions: [],
        itemId: 1
    },
    reducers: {
        askQuestion: addQuestion,
        setItem: setItemId
    },
    extraReducers: (builder) => {
        builder.addCase(getQuestions.fulfilled, (state, action) => {
            state.questions = action.payload;
        })
    }
})

export const { askQuestion } = questionSlice.actions;
export const {setItem}=questionSlice.actions;
export default questionSlice.reducer;