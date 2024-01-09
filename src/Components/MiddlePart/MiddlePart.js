import { Avatar, Card, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import StoryCircle from './StoryCircle';
import ImageIcon from '@mui/icons-material/Image';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import ArticleIcon from '@mui/icons-material/Article';
import PostCard from '../Post/PostCard';
import { useState } from 'react'
import CreatePostModal from '../CreatePost/CreatePostModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostAction } from '../../Redux/Post/Post.action';


const story = [11, 1, 1, 1, 1,]
const posts=[1,1,1,1,1,1,1]
const MiddlePart = () => {

  const dispatch=useDispatch();

  const {post}=useSelector(store=>store);

  console.log("Post are :",post)


  const [openCreatePostModal, setOpenCreatePostModal] = useState();
  const handleCloseCreatePostModal=()=>{
    setOpenCreatePostModal(false)
  }

  const handleOpenCreatePostModel = () => {
    setOpenCreatePostModal(true)
    console.log("open post model.....")
  }

  useEffect(()=>{
    dispatch(getAllPostAction())
  },[post.newComment])
  return (
    <div className='px-20'>
      {/* <setion className='flex items-center rounded-b-md mt-4'>
        <div className='flex flex-col items-center mr-4 cursor-pointer'>
          <Avatar sx={{ width: "5rem", height: "5rem" }}
          // src='https://cdn.pixabay.com/photo/2021/09/20/03/24/skeleto>n-6639547_1280.png ' className='flex flex-col items-center mr-4 cursor-pointer'
          >
            <AddIcon sx={{ fontSize: "3rem" }} />
          </Avatar>
          <p>New</p>
        </div>
        {story.map((item) => <StoryCircle />)}
      </setion> */}
      <Card className='p-3'>
        <div className='flex justify-between'>
          <Avatar />
          <input 
          onClick={handleOpenCreatePostModel}
          readOnly className='outline-none w-[90%] rounded-full
                  px-5 bg-slate-100 bg-transparent border-[#3b4054] border' type='text' />
        </div>
        <div className='flex justify-center space-x-9 mt-5'>
          <div className='flex items-center'>
            <IconButton color='primary' onClick={handleOpenCreatePostModel}>
              <ImageIcon />
            </IconButton>
            <span>media</span>
          </div>
          <div className='flex items-center'>
            <IconButton color='primary' onClick={handleOpenCreatePostModel}>
              <VideoCallIcon />
            </IconButton>
            <span>Video</span>
          </div>
          <div className='flex items-center'>
            <IconButton color='primary' onClick={handleOpenCreatePostModel}>
              <ArticleIcon />
            </IconButton>
            <span>Write Article</span>
          </div>
        </div>
      </Card>
      <div className='mt-5 space-y-5'>
        {post.posts.map((item) => <PostCard key={item.pid} item={item} />)}
      </div>
      <div>
        <CreatePostModal handleClose={handleCloseCreatePostModal} open={openCreatePostModal}/>
      </div>
    </div>

  )
}

export default MiddlePart