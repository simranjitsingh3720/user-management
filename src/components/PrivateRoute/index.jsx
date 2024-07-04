import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";
import { toast } from "react-toastify";

const PrivateRoute = ({ component: Component, ...rest }) => {
   useEffect(() => {
     if (!isAuthenticated()) {
      toast.error("Your session has expired. Please log in again!")
     }
   });
 
 return (
    isAuthenticated() ? <Component {...rest} /> : <Navigate to="/sign-in" />
 )
};

export default PrivateRoute;
