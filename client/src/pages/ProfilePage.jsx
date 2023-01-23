import { Box, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { USERS } from '../consts/apiRoute';
import FriendListWidget from '../widgets/FriendListWidget';
import NewPostWidget from '../widgets/NewPostWidget';
import PostsWidget from '../widgets/PostsWidget';
import UserWidget from '../widgets/UserWidget'

function ProfilePage() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector(state => state.token);
  const isNonMobileScreen = useMediaQuery('(min-width: 1000px)');

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`${USERS}/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.ok) {
        const getUser = await response.json();
        setUser(getUser)
        return
      }
      const error = await response.json();
      console.log(error.message || error)
    }

    getUser();
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="center">
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget userId={user._id} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={user._id} />
        </Box>
        <Box
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}>
          <NewPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <PostsWidget isProfile={true} userId={user._id} />
        </Box>
      </Box>
    </Box>
  )
}

export default ProfilePage
