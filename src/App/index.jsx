import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AppProvider from "./AppProvider";
import AppRoutes from "./AppRoutes/index";
import "typeface-poppins";
import "react-toastify/dist/ReactToastify.css";
import "./styles.scss";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
        <ToastContainer />
      </Router>
    </AppProvider>
  );
};

export default App;
