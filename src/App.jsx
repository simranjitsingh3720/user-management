import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./core/themeMuiProvider";
import "typeface-poppins";
import AppRoutes from "./core/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import appStore from "./core/utils/appStore";

function App() {
  return (
    <Provider store={appStore}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppRoutes />
          <ToastContainer />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
