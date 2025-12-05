import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import RootLayout from '../pages/RootLayout'
import Home from '../pages/Home'
import Search from '../pages/Search'
import Profile from '../pages/Profile'
import Editprofile from '../pages/Editprofile'
import Register from '../pages/Register'
import AddPosts from '../pages/AddPosts'
import Login from '../pages/Login'
import Chat from '../pages/Chat'
import Posts from '../pages/Posts'

const router = createBrowserRouter([
  {
    path:'/',
    element:<RootLayout/>,
    children:[
      {path:'/',element:<Home/>},
      {path:"/search",element:<Search/>},
      {path:'/profile',element:<Profile/>},
      {path:'/addposts',element:<AddPosts/>},
      {path:'/posts',element:<Posts/>},
      {path:'/editprofile',element:<Editprofile/>},
      {path:"/chat",element:<Chat/>},
    ]
  },
        //no navBar initiated routes
      {path:'/login',element:<Login/>},  
      {path:'/register',element:<Register/>}                                                
])

function App() {
  return <RouterProvider router ={router}/>
}

export default App;
