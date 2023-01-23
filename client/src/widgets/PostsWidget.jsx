import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { POSTS } from "../consts/apiRoute";
import { setPosts } from '../state';
import PostWidget from './PostWidget';

function PostsWidget({ userId, isProfile = false }) {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts);
    const token = useSelector(state => state.token);
    const user = useSelector(state => state.user);

    useEffect(() => {
        const getFeeds = async () => {
            const response = await fetch(`${POSTS}/${userId}/feeds`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.ok) {
                const feeds = await response.json();                
                dispatch(setPosts({ posts: feeds }))
                return;
            }
            const error = await response.json();
            console.error(error.message || error)
        }

        const getUserPosts = async () => {
            const response = await fetch(`${POSTS}/${userId}/posts`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` }
            })
            if (response.ok) {
                const userPosts = await response.json();                
                dispatch(setPosts({ posts: userPosts }));
                return;
            }
            const error = await response.json();
            console.error(error.message || error)
        }

        if (isProfile) {
             getUserPosts();
        } else {
             getFeeds();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
           
            {isProfile ?
                posts.map(({
                    _id,
                    description,
                    imagePath,
                    comments,
                    likes
                }) => (<PostWidget
                    key={_id}
                    postId={_id}
                    postUserId={user._id}
                    name={`${user.firstName} ${user.lastName}`}
                    description={description}
                    location={user.location}
                    imagePath={imagePath}
                    userPicturePath={user.picturePath}
                    likes={likes}
                    comments={comments} />))
                :
            posts.map(({
                _id,
                userId: { _id: user_Id, firstName, lastName, picturePath },
                description,
                imagePath,
                comments,
                likes
            }) => (<PostWidget
                key={_id}
                postId={_id}
                postUserId={user_Id}
                name={`${firstName} ${lastName}`}
                description={description}
                location={user.location}
                imagePath={imagePath}
                userPicturePath={picturePath}
                likes={likes}
                comments={comments}

            />))}
        </>
    )
}

export default PostsWidget
