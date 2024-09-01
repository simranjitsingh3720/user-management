import React from 'react';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import updatedTheme from '../../core/themeMuiProvider';
import { appStore, persistor } from '../../stores/appStore';
import ErrorBoundary from '../../utils/ErrorBoundary';

const AppProvider = ({ children }) => {
  return (
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistor}>
      <ErrorBoundary>
        <ThemeProvider theme={updatedTheme}>{children}</ThemeProvider>
      </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
};

export default AppProvider;
