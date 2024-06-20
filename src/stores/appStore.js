import { configureStore } from '@reduxjs/toolkit';
import dialogReducer from './slices/dialogSlice';
import exportReducer from './slices/exportSlice';
import lobReducer from './slices/lobSlice';

const appStore = configureStore({
  reducer: {
    dialog: dialogReducer,
    export: exportReducer,
    lob: lobReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});

export default appStore;
