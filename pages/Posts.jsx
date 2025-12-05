import React from 'react'
import {useState,useEffect} from 'react'
import {FaHeart, FaRegHeart} from 'react-icons/fa'
import axios from 'axios'
import Likes from './Likes.jsx'
import { useAuth } from './AuthContext'
import './Posts.css'

function Posts() {

  const {token,userID} = useAuth();
  const {likes, setLikes} = useState(0);
  const {isLiked, setIsLiked} = useState(false);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {  
    try {
      // console.log(userID);
      
      const response = await axios.get(`http://localhost:3000/auth/getposts/${userID}`, {
        headers: {  Authorization: `Bearer ${token}` }
      });  
      // console.log(response.data);  
      setPosts(response.data);  
    } catch (error) {  
      console.error("error from getposts",error);  
    }   
  }
  useEffect(() => {
  fetchPosts();
}, [userID,]);


  return (
    <div className='con'>
        <div className='posts-card'>
         {posts.postwithImages && posts.postwithImages.map((post,key) => (
           <div key={post.postID}>
             {post.postImage && (
               <img src={`data:image/jpeg;base64,${post.postImage}`} alt="Post" />
             )}
             <p>{post.caption}</p>
             <Likes key={post.postID} post={post}/>
            </div>
         ))}
        </div>

    </div>
  )
}

export default Posts