import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TOKEN, TOKEN_EXPIRATION_ERROR } from "../../utils/globalConstants";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem(TOKEN);
   useEffect(() => {
     if (!token) {
      toast.error(TOKEN_EXPIRATION_ERROR)
     }
   });
 
 return (
    token ? <Component {...rest} /> : <Navigate to="/" />
 )
};

export default PrivateRoute;
