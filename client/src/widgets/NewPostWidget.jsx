import {
    EditOutlined,
    DeleteOutline,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined
} from '@mui/icons-material'
import {
    Box, Divider, Typography,
    InputBase, Button,
    IconButton, useTheme, useMediaQuery
} from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, setPosts } from '../state'
import FlexBetween from '../components/FlexBetween'
import Dropzone from 'react-dropzone'
import WidgetWrapper from '../components/WidgetWrapper'
import { POSTS } from '../consts/apiRoute'
import UserImage from '../components/UserImage'

function NewPostWidget({ picturePath }) {
    const dispath = useDispatch();
    const [isImage, setIsImage] = useState(false)
    const [image, setImage] = useState(null)
    const [post, setPost] = useState("");    
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector(state => state.token);
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append('description', post);
        if (image) {
            formData.append('image', image);
            // formData.append('picturePath', image.name)
        }        
        const response = await fetch(POSTS, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.ok) {
            const newPost = await response.json();
            dispath(createPost({ post: newPost }))
            setImage(null);
            setPost("")
            return
        }
        const error = await response.json();
        console.error(error.message || error);
    }

    return (
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <UserImage image={picturePath} />
                <InputBase
                    placeholder="What's on your mind..."
                    onChange={e => setPost(e.target.value)}
                    value={post}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: '2rem',
                        padding: '1rem 2rem'
                    }} />
            </FlexBetween>
            {isImage && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius="5px"
                    mt="1rem"
                    p="1rem">
                    <Dropzone
                        accept={{ 'image/*': ['.jpg', '.jpeg', '.png'], }}
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}>
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`1px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    width="100%"
                                    sx={{
                                        "&:hover": {
                                            cursor: "pointer"
                                        }
                                    }}
                                >
                                    <input {...getInputProps()} />
                                    {!image ? (
                                        <p>Add Image Here</p>) :
                                        (<FlexBetween>
                                            <Typography>{image.name}</Typography>
                                            <EditOutlined />
                                        </FlexBetween>)
                                    }
                                </Box>
                                {
                                    image && (
                                        <IconButton
                                            onClick={() => setImage(null)}
                                            sx={{ width: "15%" }}
                                        >
                                            <DeleteOutline />
                                        </IconButton>
                                    )
                                }
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )}

            <Divider sx={{ margin: "1.25rem" }} />

            <FlexBetween>
                <FlexBetween gap="0.25rem"
                    onClick={() => setIsImage(prev => !prev)}>
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography
                        color={mediumMain}
                        sx={{ "&:hover": { cursor: "pointer", color: medium } }}>
                        Image
                    </Typography>
                </FlexBetween>

                {isNonMobileScreen ? (
                    <>
                        <FlexBetween gap="0.25rem">
                            <GifBoxOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Clip</Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <AttachFileOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Attachment</Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <MicOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Audio</Typography>
                        </FlexBetween>
                    </>
                ) : (
                    <FlexBetween gap="0.25rem">
                        <MoreHorizOutlined sx={{ color: mediumMain }} />
                    </FlexBetween>)}

                <Button
                    disabled={!post}
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem"
                    }}>
                    Post
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    )
}

export default NewPostWidget
