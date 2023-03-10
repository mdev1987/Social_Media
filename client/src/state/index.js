import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: 'light',
    user: null,
    token: null,
    posts: []
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token
        },
        setLogout: (state, action) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {            
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.log('user friends is not exists!')
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        createPost: (state, action) => {
            state.posts = [action.payload.post, ...state.posts,]
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map(post => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            })
            state.posts = updatedPosts;
        },
        patchLikePost: (state, action) => {
            const updatedPosts = state.posts.map(post => {
                if (post._id === action.payload.post._id) {
                    return { ...post, likes: action.payload.post.likes };
                }
                return post;
            })
            state.posts = updatedPosts;
        }
    }
})

export const { setMode, setLogin,
    setLogout, setFriends,
    createPost, setPosts,
    setPost, patchLikePost } = authSlice.actions;
export default authSlice.reducer;