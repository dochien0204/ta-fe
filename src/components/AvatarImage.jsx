import { Image } from 'antd';
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../api';

const AvatarImage = (props) => {
  const [avatarLink, setAvatarLink] = useState('');
  
  const getPresignedLink = async () => {
    const userId = localStorage.getItem('userId');
    const avatar = props.src.split('/').pop();
    try {
      const response = await axiosInstance.get('/api/user/get-avatar', {
        params: {
          userId,
          avatar, 
        },
      });

      setAvatarLink(response.data.results.url);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getPresignedLink()
  }, [props.src])

  return (
    <Image {...props} src={avatarLink}/>
  )
}

export default AvatarImage