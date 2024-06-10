import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AppProvider from "./AppProvider";
import AppRoutes from "./AppRoutes/index";
import "./styles.scss";

const App = () => {
  return (
    <React.StrictMode>
      <AppProvider>
        <Router>
          <AppRoutes />
          <ToastContainer />
        </Router>
      </AppProvider>
    </React.StrictMode>
  );
};

export default App;
