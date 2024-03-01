import "./App.css";
import React, {useEffect, useState} from "react";
import {createTheme} from "@mui/material";
import {
    defaultThemeOptions,
    extendThemeWithMixins,
} from "./core/UserMDefaultSettings/UserMDefaultSettings";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignInPage from "./Main/Signin/SigninPage";
import CreateUserMangementForm from "./Main/User Management/Components/CreateForm";
import UserManagement from "./Main/User Management";
import ResponsiveDrawer from "./Shared Components/LayoutDesign";

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
            {/* <UserMTheme theme={mainTheme}> */}
            <BrowserRouter>


                {/*<BrowserRouter>
          <LayoutDesign />
        </BrowserRouter>*/}

                <Routes>
                    <Route path="/"
                           element={<ResponsiveDrawer showSidebarAndHeader={true}><UserManagement/></ResponsiveDrawer>}/>
                    <Route path="home"
                           element={<ResponsiveDrawer showSidebarAndHeader={true}><UserManagement/></ResponsiveDrawer>}/>
                    <Route path="sign-in" element={<SignInPage/>}/>
                    <Route path="user-management-form" element={<ResponsiveDrawer showSidebarAndHeader={true}>
                        <CreateUserMangementForm/></ResponsiveDrawer>}/>
                </Routes>
            </BrowserRouter>
            {/*<BrowserRouter>*/}
            {/*  <LayoutDesign />*/}
            {/*  /!* <SignInPage /> *!/*/}
            {/*</BrowserRouter>*/}
            {/* </UserMTheme> */}
        </div>
    );
}

export default App;
