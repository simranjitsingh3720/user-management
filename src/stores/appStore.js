import { configureStore } from '@reduxjs/toolkit';
import dialogReducer from './slices/dialogSlice';
import exportReducer from './slices/exportSlice';

const appStore = configureStore({
  reducer: {
    dialog: dialogReducer,
    export: exportReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});

export default appStore;
