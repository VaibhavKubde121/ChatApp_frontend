
import { Avatar, Backdrop, Box, Button, CircularProgress, IconButton, Modal } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import ImageIcon from '@mui/icons-material/Image';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { uploadToCloudniry } from '../../Utils/UploadToCloudniry';
import { useDispatch, useSelector } from 'react-redux';
import { createPostAction } from '../../Redux/Post/Post.action'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: ".6rem",
    outline: "none"
};

const CreatePostModal = ({ handleClose, open, item }) => {

    const [selectImage, setSelectImage] = useState();

    const { auth } = useSelector(store => store)

    const [selectVideo, setSelectVideo] = useState();

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const handleSelectImage = async (event) => {
        setIsLoading(true);
        const imageUrl = await uploadToCloudniry(
            event.target.files[0], "image")
        setSelectImage(imageUrl);
        setIsLoading(false);
        formik.setFieldValue("image", imageUrl)
    };

    const handleSelectVideo = async (event) => {
        setIsLoading(true);
        const videoUrl = await uploadToCloudniry
            (event.target.files[0], "video")
        setSelectVideo(videoUrl);
        setIsLoading(false);
        formik.setFieldValue("video", videoUrl)
    }
    const formik = useFormik({
        initialValues: {
            caption: "",
            image: "",
            video: ""
        },
        onSubmit: (values) => {
            console.log("formik values ", values)
            dispatch(createPostAction(values))
            formik.values.caption = ''
        }
    });



    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <div className='flex space-x-4 items-center'>
                                <Avatar />
                                <div>
                                    <p className='font-bold text-lg'>{auth.user?.fname + " " + auth.user?.lname}</p>
                                    <p className='text-sm'>{"@" + auth.user.fname.toLowerCase() + "_" + auth.user.lname.toLowerCase()}</p>
                                </div>
                            </div>
                            <textarea
                                className='oulinne-none w-full mt-5 p-2 bg-transparent border border-[#3b4054] borderRadius'
                                placeholder="write caption....."
                                name='caption' id="" onChange={formik.handleChange}
                                value={formik.values.caption} rows={4} >
                            </textarea>
                            <div className='flex space-x-5 items-center mt-5'>
                                <div>
                                    <input type='file' accept='image/*'
                                        onChange={handleSelectImage} style={{ display: "none" }}
                                        id='image-input' />
                                    <label htmlFor='image-input'>
                                        <IconButton color='primary' component="span">
                                            <ImageIcon />
                                        </IconButton>
                                    </label>
                                    <span>
                                        Image
                                    </span>
                                </div>
                                <div>
                                    <input type='file' accept='video/*'
                                        onChange={handleSelectVideo}
                                        style={{ display: "none" }}
                                        id='video-input' />
                                    <label htmlFor='video-input'>
                                        <IconButton color='primary' component="span">
                                            <VideoCallIcon />
                                        </IconButton>
                                    </label>
                                    <span>
                                        Video
                                    </span>
                                </div>
                            </div>
                            {
                                selectVideo &&
                                <div>
                                    <img className='h-[10rem]' src={selectVideo} alt='' />
                                </div>
                            }
                            <div className='flex w-full justify-end'>
                                <Button variant='contained' type='submit' sx={{ borderRadius: "1.5rem" }} >
                                    Post
                                </Button>
                            </div>
                        </div>
                    </form>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={isLoading}
                        onClick={handleClose}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Box>
            </Modal>
        </div>
    )
}

export default CreatePostModal