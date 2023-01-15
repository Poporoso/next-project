import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const getApiInfo = createAsyncThunk('getApiInfo', async ({ url, lang }) => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_DOMAIN_URL}/${url}`)
    return {
        data: data.resource,
        lang: lang
    }
})

const initialState = {
    isLoading: false,
    lang: '',
    data: []
}

const getInfoPage = createSlice({
    name: 'getDataInfo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getApiInfo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getApiInfo.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(getApiInfo.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.lang = action.payload.lang
                state.isLoading = false
            })
    }
})

export default getInfoPage.reducer