import React from 'react'
import { useContext, createContext,useState,useEffect } from 'react'
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState('');
    const [token,setToken] = useState(localStorage.getItem("token"));
    const [userID,setUserID] = useState('');
    
    useEffect(() =>{
        if(token){
            try{
                const decode = jwtDecode(token);
                setUserID(decode.id);
                
                

            const currentTime = Date.now() / 1000;
            if(decode.exp < currentTime){
                console.log("Token Expired");
                setUser(null);
                setToken(null);
                localStorage.removeItem("token");
            }
            else{
                setUser(decode.user);
            }
            }
            catch(err){
                console.log(err);
                localStorage.removeItem("token");
                setUser(null);
                setToken(null);
            }
        }
},[token])


const login = (token) =>{
    setToken(token);
    localStorage.setItem("token",token);
    
    
}

const logout = () =>{
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
}
    return(
        <AuthContext.Provider value={{user,login,token,logout,userID}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);