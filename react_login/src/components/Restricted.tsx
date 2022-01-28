
import React from 'react'
import AuthContext from '../utilities/Auth'

const Restricted = () => {
  const { authenticated, setAuthenticated } = React.useContext(AuthContext);
  console.log(authenticated);
  return (
    <div>
      { localStorage.getItem("authenticated") == "true" ? 'RESTRICTED INFO HERE' : 'NO ACCESS' }
    </div>
  );
  
}

export default Restricted;
