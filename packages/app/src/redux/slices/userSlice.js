import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LoginService from "../../services/Login.service";

const logoutAction=(state, action)=>{
    state.authenticated=false;
    state.loading=false;
    state.users=[];
    state.user=null;
}

export const login=createAsyncThunk("login", ({username, password})=>
{
    try{
    LoginService.login(username, password).then(
        res=>{
            let user=res;
            return user;
        })}
        catch(e){
            console.log('Error: '+e)
        }
    }
);

const userSlice=createSlice({
    name:'users',
    initialState:{
        authenticated: false,
        authenticationFailed:false,
        loading:true,
        user:null,
    },
    reducers:{
        logout:logoutAction
    },
    extraReducers: (builder)=>{
        builder.addCase(login.pending, (state, {payload})=>{
            console.log("loading")
            state.loading = true;
        })
        .addCase(login.rejected, (state, {payload})=>{
            console.log("rejected")
            state.authenticationFailed = true;
            state.loading = false;
        })
        .addCase(login.fulfilled, (state, {payload})=>{
            console.log("fulfilled")
            state.authenticated = true;
            state.authenticationFailed = false;
            state.loading = false;
            state.user = payload;
        }) 
    }
})

export const {logout} =userSlice.actions;
export default userSlice.reducer;