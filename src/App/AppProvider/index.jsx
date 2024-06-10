import React from "react";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";

import theme from "../../core/themeMuiProvider";
import appStore from "../../stores/appStore"

const AppProvider = ({ children }) => {
  return (
    <Provider store={appStore}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
};

export default AppProvider;
