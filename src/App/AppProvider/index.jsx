import React from 'react';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import updatedTheme from '../../core/themeMuiProvider';
import { appStore } from '../../stores/appStore';
import ErrorBoundary from '../../utils/ErrorBoundary';

const AppProvider = ({ children }) => {
  return (
    <Provider store={appStore}>
      <ErrorBoundary>
        <ThemeProvider theme={updatedTheme}>{children}</ThemeProvider>
      </ErrorBoundary>
    </Provider>
  );
};

export default AppProvider;
