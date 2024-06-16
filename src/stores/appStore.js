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
      serializableCheck: {
        ignoredActions: ['dialog/showDialog'],
        ignoredPaths: ['dialog.content', 'dialog.actions'],
      },
    }),
});

export default appStore;
