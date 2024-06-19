import { configureStore } from '@reduxjs/toolkit';
import dialogReducer from './slices/dialogSlice';
import filterReducer from './slices/filterSlice';

const appStore = configureStore({
  reducer: {
    dialog: dialogReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});

export default appStore;
