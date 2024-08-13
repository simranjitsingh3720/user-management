import React from 'react';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';

import updatedTheme from '../../core/themeMuiProvider';

import { appStore } from '../../stores/appStore';

const AppProvider = ({ children }) => {
  return (
    <Provider store={appStore}>
      <ThemeProvider theme={updatedTheme}>{children}</ThemeProvider>
    </Provider>
  );
};

export default AppProvider;
