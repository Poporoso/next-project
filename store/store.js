import { configureStore } from "@reduxjs/toolkit"
import dataBookingSlice from "./dataBookingSlice"
import dataAnnunciSlice from "./dataAnnunciSlice"
import dataInfoSlice from "./dataInfoSlice"
import userSlice from "./userSlice"

const store = configureStore({
    reducer: {
        dataAnnunci: dataAnnunciSlice,
        userSlice: userSlice,
        dataBooking: dataBookingSlice,
        infoSlice: dataInfoSlice
    },
})

export default store