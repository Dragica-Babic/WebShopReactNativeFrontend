import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserService from "../../services/User.service";

const logoutAction = (state, action) => {
    state.authenticated = false;
    state.authenticationFailed = false;
    state.loading = false;
    state.users = [];
    state.user = null;
}

const getUpdate = (state, action) => {
    state.user = action.payload;
}

export const login = createAsyncThunk("login", async ({ username, password }, { rejectWithValue }) => {
    try {
        return await UserService.login(username, password);
    } catch (error) {
        if (!error.response)
            throw error;
        return rejectWithValue(error.response.data);
    }

}
);

export const signup = createAsyncThunk("signup", async (request, { rejectWithValue }) => {

    try {
        return await UserService.signup(request);
    } catch (error) {
        if (!error.response)
            throw error;
        return rejectWithValue(error.response.data);
    }
});

export const updateUser = createAsyncThunk("updateUser", async ({ id, request }, { rejectWithValue }) => {
    try {
        return await UserService.updateUser(id, request);
    } catch (error) {
        if (!error.response)
            throw error;
        return rejectWithValue(error.response.data);
    }
})

const userSlice = createSlice({
    name: 'users',
    initialState: {
        authenticated: false,
        authenticationFailed: false,
        loading: true,
        user: null,
    },
    reducers: {
        logout: logoutAction,
        update: getUpdate
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
            .addCase(signup.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(signup.rejected, (state, action) => {
                state.authenticationFailed = true;
                state.loading = false;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.authenticated = true;
                state.authenticationFailed = false;
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
    }
})

export const { logout } = userSlice.actions;
export const { update } = userSlice.actions;
export default userSlice.reducer;