import "./App.css";
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignInPage from "./Main/Signin/SigninPage";
import CreateUserMangementForm from "./Main/User Management/Components/CreateForm";
import UserManagement from "./Main/User Management";
import ResponsiveDrawer from "./Shared Components/LayoutDesign";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"
                       element={<ResponsiveDrawer
                           showSidebarAndHeader={true}><UserManagement/></ResponsiveDrawer>}/>
                <Route path="home"
                       element={<ResponsiveDrawer
                           showSidebarAndHeader={true}><UserManagement/></ResponsiveDrawer>}/>
                <Route path="sign-in" element={<SignInPage/>}/>
                <Route path="user-management-form" element={<ResponsiveDrawer showSidebarAndHeader={true}>
                    <CreateUserMangementForm/></ResponsiveDrawer>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
