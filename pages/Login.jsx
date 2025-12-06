import React from 'react';
import  "./Login.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import API from './Api';
import { useState } from 'react';
function Login() {

    const navigate = useNavigate();
    const{login} = useAuth();

    const [username, setuserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

const toSubmit = async (e) => {
        e.preventDefault()

        const userDetails = {
                // username:username,
                email: email,
                password:password
        }

   const response = await  axios.post(`${API}/auth/login`, userDetails)
     localStorage.setItem("token", response.data.token)
        console.log("token",response.data.token);
      
        if(response.data.token){
                login(response.data.token);
                navigate('/');
        }
        
  }

    
  return (
    <div className='container'>
       <div className='login-card'>
           <h1>Login</h1>
         <form onSubmit={toSubmit}>
            {/* Username :
                    <input type='text' placeholder='Eneter Your Name ' value={username} 
                    onChange={(e) => setuserName(e.target.value)}/> <br/> */}
            Email :
                    <input type='email' placeholder='Eneter Your Email ' value={email}
                    onChange={(e) => setEmail(e.target.value)}/>  <br/>
            Password :
                    <input type='password' placeholder='Eneter Your Password ' value={password}
                    onChange={(e) => setPassword(e.target.value)}/>  <br/>
            <button type='submit'>Login</button>
            <div><Link to='/register'>Sign Up</Link></div>
        </form>
       </div>
    </div>
  )
}

export default Login