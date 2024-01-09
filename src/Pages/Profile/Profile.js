import { Avatar, Box, Button, Card, Tab, Tabs } from '@mui/material'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PostCard from '../../Components/Post/PostCard'
import UsersReelsCards from '../../Components/Reels/UsersReelsCards'
import { useDispatch, useSelector } from 'react-redux'
import ProfileModal from './ProfileModal'
import { getUsersPostAction } from '../../Redux/Post/Post.action'

const tabs = [
  { value: "post", name: "Post" },
  // { value: "reels", name: "Reels" },
  // { value: "saved", name: "Saved" },
  // { value: "repost", name: "Repost" },
]

// const posts = [1, 1, 1, 1];
const reels = [1, 1, 1, 1]
const savedpost = [1, 1, 1, 1];

const Profile = () => {
  const { id } = useParams()
  const dispatch = useDispatch();
  const { auth, post } = useSelector(store => store);
  const [value, setValue] = React.useState('post');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  const [open, setOpen] = React.useState(false);
  const handleOpenProfileModal = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    dispatch(getUsersPostAction(auth.user.id));
  })
  return (
    <>
      <Card className='w-[70%] ml-3'>
        <div className='rounded-md'>
          <div className='h-[15rem]'>
            <img className='w-full h-full rounded-t-md'
              src='https://media.istockphoto.com/id/1334591614/photo/man-using-digital-tablet-online-connect-to-internet-banking-currency-exchange-online-shopping.webp?s=2048x2048&w=is&k=20&c=i4g0apzIPwkQ-3Iww4YYCrcNncrV5812m39vwUuU9m8=' alt='' />
          </div>
          <div className='px-5 flex justify-between items-start mt-5 h-[5rem]'>
            <Avatar
              className='transform -translate-y-24'
              sx={{ width: "10rem", height: "10rem" }}
              src='https://wallpapers.com/images/hd/jai-shree-ram-hd-black-orange-face-1uqx37hp55ct9xg3.jpg' />
            {true ? (<Button sx={{ borderRadius: "20px" }} variant='outlined' onClick={handleOpenProfileModal}>Edit Profile</Button>) :
              (<Button variant='outlined'>
                Follow
              </Button>)}
          </div>
          <div className='p-5'>
            <div>
              <h1 className='py-1 font-bold text-xl'>
                {auth.user?.fname + " " + auth.user.lname}
              </h1>
              <p>@{auth.user?.fname.toLowerCase() + " " + auth.user?.lname.toLowerCase()}</p>
            </div>
            <div className='flex gap-5 items-center py-3'>
              <span>41 post</span>
              <span>35 Follwers</span>
              <span>5 Following</span>
            </div>
            <div>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
          <section>
            <Box sx={{ width: '100%', borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="wrapped label tabs example"
              >
                {tabs.map((item) => <Tab value={item.value} label={item.name} wrapped />)}
              </Tabs>
            </Box>
            <div className='flex justify-center'>
              {value === "post" ? (<div className='space-y-5 w-[70%] my-10'>
                {post.posts.map((item) => (<div className='border border-slate-100 rounded-md'>
                  <PostCard item={item} />
                </div>
                ))}
              </div>
              ) : value === "reels" ? (<div className='flex justify-center flex-wrap gap-2 my-10'>
                {reels.map((item) => <UsersReelsCards />)}
              </div>
              ) : value === "saved" ? <div className='space-y-5 w-[80%] my-10'>
                {savedpost.map((item) => (<div className='border border-slate-100 rounded-md'>
                  <PostCard item={item} />
                </div>
                ))}
              </div> : (
                <div> Repost
                </div>
              )}
            </div>
          </section>
        </div>

        <section>
          <ProfileModal open={open} handleClose={handleClose} />
        </section>
      </Card>
    </>

  )
}

export default Profile