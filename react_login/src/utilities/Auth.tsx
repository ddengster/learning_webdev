import React from "react";

const AuthContext = React.createContext({
    authenticated: false,
    setAuthenticated: (auth : boolean) => {} }
);

export default AuthContext;