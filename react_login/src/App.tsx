import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login'
import Restricted from './components/Restricted'

// import AuthContext from './utilities/Auth';
export const AuthContext = React.createContext({
  authenticated: false,
  setAuthenticated: (auth : boolean) => {} }
);

  
function App() {
  const [authenticated, setAuthenticated] = React.useState(false);


  return (
    <Router>
      <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
        <Routes>
          <Route path='/login' element={<Login />} />
          { /*<Route path='/register' component={Register} />
          <Route path='/forgot-password' component={Forgot} /> */}
          <Route path='/' element={<Login />} />
          <Route path='/restricted' element={<Restricted />} />
        </Routes>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
