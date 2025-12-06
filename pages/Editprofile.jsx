import React from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext.jsx'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from './Api.jsx';

function Editprofile() {
    const {userID,token} = useAuth();
    const navigate = useNavigate();
    const [bio,setBio] = useState('');
    const [username,setUsername] = useState('');
    const [profilePicture,setProfilePicture] = useState(null);

    const toeditprofile = async (e) => {
        e.preventDefault(); 
        if (!username || !bio) return;

        console.log("sending token ", token, "userID:", userID);
        

        const formData = new FormData();
        formData.append('username',username)
        formData.append('bio',bio);
        if (profilePicture) formData.append('profilePicture', profilePicture); // name must match server
        if(userID)formData.append('userID', userID);
        try {
          const headers = token ? { Authorization: `Bearer ${token}` } : {};
          const response = await axios.post(`${API}/auth/editprofile/${userID}`, formData,{ headers });
          console.log('User Profile Updated Successfully', response.data);
          navigate('/profile');
        } catch (err) {
          console.log('Error in updating the profile', err);
        }
    }
  return (
    <div>
        <form onSubmit={toeditprofile}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="text" placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
            Profile Picture:
            <input type="file" name="profilePicture" id="profilePicture" accept="image/*" onChange={(e) => setProfilePicture(e.target.files[0])} />
            <button type="submit">Update Profile</button>
        </form>
    </div>
  )
}

export default Editprofile;