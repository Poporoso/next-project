import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    search: {
        comuneText: '',
        provinciaText: '',
        regioneText: '',
        tipo: '',
        prezzoMin: 48000,
        prezzoMax: 280000,
        tipologia: '',
        regione: '',
        provincia: '',
        mqMin: 10,
        mqMax: 100,
        ce: '',
        piano: '',
        zona: '',
        comune: '',
        bagni: '',
        locali: '',
    }
}

const getDataBooking = createSlice({
    name: 'setSearch',
    initialState,
    reducers: {
        setSearch(state, actions) {
            state.search = actions.payload
        }
    }
})

export const {
    setSearch
} = getDataBooking.actions

export default getDataBooking.reducer