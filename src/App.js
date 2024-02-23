import "./App.css";
import LayoutDesign from "./Shared Components/LayoutDesign";
import React, {useEffect, useState} from "react";
import UserMTheme from "./core/themeProvider";
import {createTheme} from "@mui/material";
import {
    defaultThemeOptions,
    extendThemeWithMixins,
} from "./core/UserMDefaultSettings/UserMDefaultSettings";
import BrowserRouter from "./core/BrowserRouter/BrowserRouter";

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
                    <LayoutDesign/>
                </BrowserRouter>
            </UserMTheme>
        </div>
    );
}

export default App;
