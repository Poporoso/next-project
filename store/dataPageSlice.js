import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const getApiPage = createAsyncThunk('getApiPage', async (endpoint) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_DOMAIN_URL}/${endpoint}`)
    return data.resource
})

const initialState = {
    isLoading: false,
    data: []
}

const getDataPage = createSlice({
    name: 'getDataPage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getApiPage.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getApiPage.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(getApiPage.fulfilled, (state, action) => {
                state.data = action.payload
                state.isLoading = false
            })
    }
})

export default getDataPage.reducer