import "./App.css";
import LayoutDesign from "./Shared Components/LayoutDesign";
import React, { useEffect, useState } from "react";
import UserMTheme from "./core/themeProvider";
import { createTheme } from "@mui/material";
import {
  defaultThemeOptions,
  extendThemeWithMixins,
} from "./core/UserMDefaultSettings/UserMDefaultSettings";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignInPage from "./Main/Signin/SigninPage";

// Assuming generateMuiTheme is a function to generate the main theme
const generateMuiTheme = () => {
  const data = Object.assign({}, defaultThemeOptions);

  return createTheme(
    Object.assign({}, data, {
      mixins: extendThemeWithMixins(data),
    })
  );
};

function App() {
  const [mainTheme, setMainTheme] = useState(() => {
    return generateMuiTheme();
  });

  // useEffect to update main theme when direction changes
  useEffect(() => {
    setMainTheme(generateMuiTheme());
  }, []);

  return (
    <div>
      <UserMTheme theme={mainTheme}>
        <BrowserRouter>
          <Routes>
            {/*<Route path="/" element={<LayoutDesign />}>*/}
              <Route index element={<LayoutDesign />} />
              <Route path="sign-in" element={<SignInPage />} />
              <Route path="home" element={<LayoutDesign />} />
            {/*</Route>*/}
          </Routes>
        </BrowserRouter>
        {/*<BrowserRouter>*/}
        {/*  <LayoutDesign />*/}
        {/*  /!* <SignInPage /> *!/*/}
        {/*</BrowserRouter>*/}
      </UserMTheme>
    </div>
  );
}

export default App;
