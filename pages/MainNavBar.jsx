import React from 'react';
import "./MainNavBar.css"
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import { FaUserCircle } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { CiChat1 } from "react-icons/ci";
import { LuLogOut } from "react-icons/lu";
import { MdOutlineAddBox } from "react-icons/md";


function MainNavBar() {

  const togetout = () =>{
    localStorage.removeItem("token");
    window.location.reload();
  }
  const {token} = useAuth();
  return (
    <div>
        <nav>
          <div className='rl'>
              <div className='logo'>
                <div><h1>Retina</h1></div>
                <div>
                  {
                    token ?(
                      <Link to='/profile'>
                        <div className='prof'>
                          <FaUserCircle size={60}/>
                        </div>
                      </Link>
                    ):(
                      <Link to='/login'>Login</Link>
                    )
                  }
                </div>
             </div>
          </div>
             <ul className='nav'>
                <li className='a'>
                  <Link to='/'><IoHome size={30}/></Link>
                </li>
                <li>
                  {
                    token && (<Link to='/chat'>
                      <CiChat1 size={30}/>
                    </Link>)
                  }
                </li>
                <li>
                     {
                      token && (<Link to='/addposts'>
                        <MdOutlineAddBox size={30}/>
                      </Link>)
                     }
                 </li>
                  <li>
                     {
                      token && (<a onClick={togetout}>
                        <LuLogOut size={30}/>
                      </a>)
                     }
                </li>
             </ul>
        </nav>
    </div>
  )
}

export default MainNavBar