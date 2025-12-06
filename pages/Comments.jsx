import React from 'react'
import {FaRegComments} from 'react-icons/fa'
import axios from 'axios'
import { useAuth } from './AuthContext.jsx'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import API from './Api.jsx';

function Comments({post}) {
    const {userID,token} = useAuth();
    const naviagte = useNavigate();
    const [comment, setComment] = useState('');
    const [commentsCount, setCommentsCount] = useState(0);

    const toPostComments = async (e) => {
        e.preventDefault(); 
        if (!comment) return;
        try {
          const headers = token ? { Authorization: `Bearer ${token}` } : {}
          const response = await axios.post(`${API}/auth/toPostComments/${post.postID}`,{comment},{ headers });
          console.log('User added POst  Successfully', response.data);
          naviagte('/posts');
        } catch (err) {
          console.log('Error in Creating post', err);
        }
      }
  return (
    <div>
         <input type='text'/>
    </div>
  )
}

export default Comments