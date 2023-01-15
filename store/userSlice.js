import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: {}
}

const userLogged = createSlice({
    name: 'userConnected',
    initialState,
    reducers: {
        setUserConnect(state, actions) {
            state.userData = actions.payload
        },
    }
})

export const {
    setUserConnect
} = userLogged.actions

export default userLogged.reducer