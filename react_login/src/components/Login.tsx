
import React, { isValidElement, useState, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import FormValidator from '../utilities/FormValidator'
import AuthContext from '../utilities/Auth';

interface ValidatorRes
{
  errors : any;
};

const Login = () => {
	
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [validate, setValidate] = useState<ValidatorRes>({ errors : null });
  const { setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const validateLogin = () => {
    let valid = true;

    let validator = FormValidator.validator({
      email: {
        value: email,
        isRequired: true,
        minLength: 6
      },
      password: {
        value: password,
        isRequired: true,
        minLength: 6
      }
    });

    if (validator !== null) {
      setValidate({ errors: validator.errors });
      valid = true;
    }
    return valid;
  }

  const authenticate = (e: React.FormEvent) => {
    e.preventDefault();

    const validate = validateLogin();
    console.log(validate);

    if (validate)
    {
      setValidate({ errors: null });
      setEmail("");
      setPassword("");
      //alert("success login");
      // const n = useNavigate();
      // navigate("/Restricted");
      //setAuth(true);
      setAuthenticated(true);
      localStorage.setItem("authenticated", "true");

      
      navigate('/restricted');
    }

  };

	return (
  
    <div>
      <div style={{display:'block', marginLeft:'auto', marginRight:'auto', width:'180px', textAlign:'center'}}>
          <p>Login to your account</p>
      </div>
      <div style={{display:'block',marginLeft:'auto', marginRight:'auto', width:'305px', textAlign:'center'}}>
        <form method="POST" onSubmit={authenticate}>
          <div>
            <label style={{ paddingRight:'28px'}}>Email: </label>
            <div style={{display:'inline-block', width:'55%', maxWidth:'600px'}}>
              <input type="email" id="email" name="email" value={email} placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
          </div>
          <div>
            <label>Password: </label>
            <div style={{display:'inline-block', width:'55%', maxWidth:'600px'}}>
              <input type="password" id="password" name="password" value={password} placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}/>
            </div>
          </div>
          <div style={{display:'block', textAlign:'center'}}>
            <input className="form-check-input" type="checkbox" checked={remember}
              onChange={(e) => setRemember(e.currentTarget.checked)}/>
            <label>Remember Me</label>
          </div>
          <div style={{display:'block', textAlign:'center'}}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
    );
}

export default Login;
