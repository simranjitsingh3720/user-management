import { configureStore } from "@reduxjs/toolkit";
import lobSlice from "../Redux/getLob";
import productSlice from "../Redux/getProduct";
import locationSlice from "../Redux/getLocation";
import roleSlice from "../Redux/getRole";
import paymentTypeSlice from "../Redux/getPaymentType";
import producerCodeSlice from "../Redux/getProducerCode";

const appStore = configureStore({
    reducer: {
        lob: lobSlice,
        product: productSlice,
        location: locationSlice,
        role: roleSlice,
        paymentType: paymentTypeSlice,
        producerCode: producerCodeSlice
    }
})

export default appStore;