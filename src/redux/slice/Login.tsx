'use client'

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { List } from "postcss/lib/list";

interface LoginState {
    accessToken: string | null;
}

const initialState: LoginState = {
    accessToken: null,
};
export const Login = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        logout: (state) => {
            state.accessToken = null;
        },
    },
});
export const { setLogin, logout } = Login.actions;
export default Login.reducer;