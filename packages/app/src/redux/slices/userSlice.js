import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LoginService from "../../services/Login.service";

const logoutAction = (state, action) => {
    state.authenticated = false;
    state.loading = false;
    state.users = [];
    state.user = null;
}

export const login = createAsyncThunk("login", async ({ username, password }) => {
    try {
        return await LoginService.login(username, password);
    }
    catch (e) {
        console.log('Error: ' + e)
    }
}
);

const userSlice = createSlice({
    name: 'users',
    initialState: {
        authenticated: false,
        authenticationFailed: false,
        loading: true,
        user: null,
    },
    reducers: {
        logout: logoutAction
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.loading = true;
        })
            .addCase(login.rejected, (state, action) => {
                state.authenticationFailed = true;
                state.loading = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.authenticated = true;
                state.authenticationFailed = false;
                state.loading = false;
                state.user = action.payload;
            })
    }
})

export const { logout } = userSlice.actions;
export default userSlice.reducer;