// ...existing code...
import React, { useState, useEffect } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import axios from 'axios'
import { useAuth } from './AuthContext'
import { Form } from 'react-router-dom'

function Likes({ post }) {
  const { token } = useAuth()
  const [likescount, setLikes] = useState(post?.likescount ?? 0)
  const [isLiked, setIsLiked] = useState([])

  // keep local state in sync if parent updates the post prop
  useEffect(() => {
    setLikes(post?.likescount ?? 0)
    setIsLiked([])
  }, [post.postID])

  const likesPost = async () => {

    const formData = new FormData()
    formData.append('likescount',likescount );
    formData.append('isLiked', isLiked );

    if (!post?.postID) return

    const prevLiked = isLiked
    const prevLikes = likescount

    if(isLiked){
      setIsLiked(!prevLiked)
      setLikes(Math.max(0, likescount-1))
    }
    else{
       setLikes(p => p + 1)
      setIsLiked(true)
    }

    try {
          const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.post(`http://localhost:3000/auth/like/${post.postID}`,formData, { headers });
    //   console.log(res.data);    
      setIsLiked(res.data.isLiked);
      // sync with server response if provided
      if (typeof res.data.isLiked !== 'undefined') setIsLiked(Boolean(res.data.isLiked))
      if (typeof res.data.likesCount !== 'undefined') setLikes(res.data.likesCount)
    } catch (err) {
      // rollback on error
      setIsLiked(prevLiked)
      setLikes(prevLikes)
      console.error('Error liking post:', err.response?.data || err.message)
    }
  }

  return (
    <div>
      <div
        className='like-section'
        onClick={likesPost}
        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      >
        {isLiked ? <FaHeart color='red' size={24} /> : <FaRegHeart size={24} color='white' />}
        <span style={{ marginLeft: 8 }}>{likescount}</span>
      </div>
    </div>
  )
}

export default Likes