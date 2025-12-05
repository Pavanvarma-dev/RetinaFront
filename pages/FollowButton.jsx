import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext.jsx'
import "./FollowButton.css"

function FollowButton({ currentUserID, profileUserID }) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [loading, setLoading] = useState(false)
  const { token } = useAuth()

  useEffect(() => {
    if (!currentUserID) return
    let mounted = true

    async function fetchFollows() {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {}
        // get list of users currentUserID is following
        const res = await axios.get(`http://localhost:3000/auth/getfollowing/${currentUserID}`, { headers })

        // normalize possible response shapes
        const list = res.data?.following || res.data || []
        const found = list.some(item =>
          item === profileUserID ||
          item?.followingID === profileUserID ||
          item?.userID === profileUserID
        )

        if (mounted) setIsFollowing(Boolean(found))
      } catch (err) {
        console.error('fetchFollows error:', err.response?.data || err.message)
      }
    }

    fetchFollows()
    return () => { mounted = false } // cleanup (not a Promise)
  }, [currentUserID, profileUserID, token])

  const handleFollow = async () => {
    if (!currentUserID) return
    setLoading(true)
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {}
      // followerID should be the logged-in user
      await axios.post('http://localhost:3000/auth/follow', {
        followerID: currentUserID,
        followingID: profileUserID
      }, { headers })
      setIsFollowing(true)
    } catch (err) {
      console.error('follow error:', err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUnfollow = async () => {
    if (!currentUserID) return
    setLoading(true)
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {}
      await axios.post('http://localhost:3000/auth/unfollow', {
        followerID: currentUserID,
        followingID: profileUserID
      }, { headers })
      setIsFollowing(false)
    } catch (err) {
      console.error('unfollow error:', err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={isFollowing ? handleUnfollow : handleFollow} disabled={loading}>
        {loading ? '...' : (isFollowing ? 'Following' : 'Follow')}
      </button>
    </div>
  )
}

export default FollowButton