
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction, likePostAction } from '../../Redux/Post/Post.action';
import { isLikeByLikeUsers } from '../../Utils/isLikeByReqUsers';

const PostCard = ({ item }) => {
    const [showComment, setShowComment] = useState();
    const dispatch = useDispatch();
    const { post, auth } = useSelector(store => store)
    const handleShowComment = () => {
        setShowComment(!showComment);
    }
    const handleCreateComment = (content,e) => {
        const reqData = {
            postId: item.pid,
            data: {
                content
            }
        }
        dispatch(createCommentAction(reqData))
    }

    const handleLikePost = () => {
        dispatch(likePostAction(item.pid))
    }

    return (
        <Card className=''>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" 
                    src='https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'>
                        
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={item.user?.fname + " " + item.user?.lname}
                subheader={"@" + item.user.fname.toLowerCase() + "_" + item.user.lname.toLowerCase()}
            />
            {/* <CardMedia
                component="img"
                height="100"
                image={item.image}
                alt="Paella dish"
            /> */}
            <img className='w-full max-h-[30rem] object-cover object-top' src={item.image} alt='' />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {item.caption}
                </Typography>
            </CardContent>
            <CardActions className='flex justify-between' disableSpacing>
                <div>
                    <IconButton onClick={handleLikePost}>
                        {isLikeByLikeUsers(auth.user?.id, item) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <IconButton>
                        {< ShareIcon />}
                    </IconButton>
                    <IconButton onClick={handleShowComment}>
                        {< ChatBubbleIcon />}
                    </IconButton>
                </div>
                <div>
                    <IconButton>
                        {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                </div>
            </CardActions>
            {showComment && <section>
                <div className='flex items-center space-x-5 mx-3 my-5'>
                    <Avatar sx={{}} />
                    <input onKeyPress={(e) => {
                        if (e.key == "Enter") {
                            handleCreateComment(e.target.value);
                            console.log("enter pressed....", e.target.value)
                            e.target.value=''
                        }
                    }}
                        className='w-full outline-none bg-transparent border 
                    border-[#3b4054] rounded-full px-5 py-2' type='text' placeholder='write your comment....' />
                </div>
                <Divider />
                <div className='mx-3 space-y-2 my-5 text-xs'>
                    {/* <div className='flex justify-between items-center'> */}
                    {item.comments.map((comment) => <div className='flex items-center space-x-5'>
                        <Avatar sx={{ height: "2rem", width: "2rem", fontSize: ".8rem", bgcolor: red[500] }}>
                            {comment.user.fname[0]}
                        </Avatar>
                        <p>{comment.content}</p>
                    </div>)}
                </div>
                {/* </div> */}
            </section>}
        </Card>
    )
}

export default PostCard