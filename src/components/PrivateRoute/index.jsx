import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { TOKEN, TOKEN_EXPIRATION_ERROR } from "../../utils/globalConstants";
import toastifyUtils from "../../utils/toastify";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem(TOKEN);
   useEffect(() => {
     if (!token) {
      toastifyUtils.notifyError(TOKEN_EXPIRATION_ERROR)
     }
   });
 
 return (
    token ? <Component {...rest} /> : <Navigate to="/" />
 )
};

export default PrivateRoute;
