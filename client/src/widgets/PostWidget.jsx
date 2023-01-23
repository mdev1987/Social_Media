import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined
} from '@mui/icons-material';
import {
    Box, Divider, IconButton,
    Typography, useTheme
} from '@mui/material';
import FlexBetween from '../components/FlexBetween';
import Friend from '../components/Friend';
import WidgetWrapper from '../components/WidgetWrapper';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { patchLikePost } from '../state';
import { POSTS, HOST_ADDRESS } from '../consts/apiRoute';

function PostWidget({
    postId,
    postUserId,
    name,
    description,
    location,
    imagePath,
    userPicturePath,
    likes,
    comments,
}) {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const loggedInUserId = useSelector(state => state.user._id)
    const isLiked = Boolean(likes.includes(loggedInUserId));
    const likesCount = likes.length;

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {
        const response = await fetch(`${POSTS}/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: loggedInUserId })
        })

        if (response.ok) {
            const likedPost = await response.json();            
            dispatch(patchLikePost({ post: likedPost }))
            return;
        }
        const error = await response.json();
        console.error(error.message || error)
    }

    return (
        <WidgetWrapper m="2rem 0">
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />
            <Typography color={main} sx={{ mt: '1rem' }}>
                {description}
            </Typography>
            {imagePath && (
                <img width="100%" height="auto" alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={`${HOST_ADDRESS}/${imagePath}`}
                />
            )}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (<FavoriteOutlined sx={{ color: primary }} />)
                                : (<FavoriteBorderOutlined sx={{ color: primary }} />)}
                        </IconButton>
                        <Typography>{likesCount}</Typography>
                    </FlexBetween>
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComments(prev => !prev)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>

                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>
            {isComments && (
                <Box mt="0.5rem">
                    {comments.map((comment, i) => (
                        <Box key={`${name}-${i}`}>
                            <Divider />
                            <Typography sx={{
                                color: main, m: "0.5rem",
                                pl: "1rem"
                            }}>
                                {{ comment }}
                            </Typography>
                        </Box>
                    ))}
                    <Divider />
                </Box>
            )}
        </WidgetWrapper>
    )
}

export default PostWidget