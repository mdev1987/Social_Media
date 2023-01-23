import { Box, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar'
import AdvertWidget from '../widgets/AdvertWidget';
import FriendListWidget from '../widgets/FriendListWidget';
import NewPostWidget from '../widgets/NewPostWidget';
import PostsWidget from '../widgets/PostsWidget';
import UserWidget from '../widgets/UserWidget';

function HomePage() {
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const { _id: userId, picturePath } = useSelector(state => state.user);
  return (
    <Box>
      <Navbar />
      <Box
        width="100vw"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between">
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}>
          <NewPostWidget picturePath={picturePath} />
          <PostsWidget userId={userId} />
        </Box>
        {isNonMobileScreen && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={userId} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default HomePage
