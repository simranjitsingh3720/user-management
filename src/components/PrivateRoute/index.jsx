import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";
import { toast } from "react-toastify";
import { TOKEN_EXPIRATION_ERROR } from "../../utils/globalConstants";

const PrivateRoute = ({ component: Component, ...rest }) => {
   useEffect(() => {
     if (!isAuthenticated()) {
      toast.error(TOKEN_EXPIRATION_ERROR)
     }
   });
 
 return (
    isAuthenticated() ? <Component {...rest} /> : <Navigate to="/" />
 )
};

export default PrivateRoute;
