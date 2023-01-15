import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


export const nextStep = createAsyncThunk('nextStep', async ({ url, dataJson }) => {
    if (url) {
        const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_DOMAIN_URL}/${url}`,
            dataJson,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        return data
    }
    return ''
})

const initialState = {
    isLoading: false,
    prezzo: {
        rooms: 0,
        services: 0
    },
    soggiorno: {
        tariffe: {},
        servizi: {},
        promozione: null,
        informazioni: {}
    },
    data: []
}

const getDataBooking = createSlice({
    name: 'getBooking',
    initialState,
    reducers: {
        resetSoggiorno(state, actions) {
            state.prezzo.rooms = 0
            state.prezzo.services = 0
            state.soggiorno.tariffe = {}
            state.soggiorno.servizi = {}
            state.soggiorno.promozione = null
        },
        setPrezzoSoggiorno(state, actions) {
            state.prezzo[actions.payload.tipo] = actions.payload.prezzo
        },

        setInformazioniSoggiorno(state, actions) {
            state.informazioni = actions.payload
        },

        selezionaServizo(state, actions) {
            state.soggiorno.servizi = actions.payload
        },

        eliminaTariffaSelezionata(state, actions) {
            delete state.soggiorno.tariffe[actions.payload[0]][actions.payload[1]]
        },
        eliminaTipoSelezionato(state, actions) {
            delete state.soggiorno.tariffe[actions.payload]
        },
        selezionaSoggiorno(state, actions) {
            state.soggiorno = actions.payload
        },

        setPromozione(state, actions) {
            state.soggiorno.promozione = actions.payload
        },

        deletePromozione(state) {
            state.soggiorno.promozione = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(nextStep.pending, (state) => {
                state.isLoading = true
            })
            .addCase(nextStep.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(nextStep.fulfilled, (state, action) => {
                state.data = action.payload.resource
                state.isLoading = false
            })
    }
})

export const {
    selezionaSoggiorno,
    eliminaTariffaSelezionata,
    selezionaServizo,
    eliminaTipoSelezionato,
    setPrezzoSoggiorno,
    setPromozione,
    deletePromozione,
    resetSoggiorno,
    setInformazioniSoggiorno
} = getDataBooking.actions

export default getDataBooking.reducer