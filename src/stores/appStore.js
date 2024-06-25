import { configureStore } from "@reduxjs/toolkit";
import lobSlice from "../Redux/getLob";
import productSlice from "../Redux/getProduct";
import locationSlice from "../Redux/getLocation";
import roleSlice from "../Redux/getRole";
import paymentTypeSlice from "../Redux/getPaymentType";
import producerCodeSlice from "../Redux/getProducerCode";
import dialogReducer from './slices/dialogSlice';
import exportReducer from './slices/exportSlice';
import lobReducer from './slices/lobSlice';
import productReducer from './slices/productSlice';
import userReducer from './slices/userSlice';

const appStore = configureStore({
  reducer: {
    dialog: dialogReducer,
    export: exportReducer,
    lobUserCreation: lobSlice,
    productUserCreation: productSlice,
    user: userReducer,
    lob: lobReducer,
    product: productReducer,
    location: locationSlice,
    role: roleSlice,
    paymentType: paymentTypeSlice,
    producerCode: producerCodeSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});
export default appStore;
