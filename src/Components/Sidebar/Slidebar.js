
import React from 'react'
import { navigationMenu } from './SidebarNavigation'
import { Avatar, Button, Card, Divider, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Slidebar = () => {
  const { auth } = useSelector(store => store)
  const navigate = useNavigate();
  const handleNavigate = (item) => {
    if (item.title === "Profile") {
      navigate(`/profile/${auth.user?.id}`)
    }
    if(item.title==="Home")
    {
      navigate(`/`);
    }
    if(item.title=="Message")
    {
      navigate(`/message`)
    }
  }
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (

    <Card className='card h-screen flex flex-col justify-between py-5'>
      <div className='space-y-8 pl-5'>
        <div className=''>
          <span className='logo font-bold text-xl'>Chat App</span>
        </div>
        <div className='space-y-8'>
          {navigationMenu.map((item) =>
            <div onClick={() => handleNavigate(item)} className='cursor-pointer flex space-x-3 items-center '>
              {item.icon}
              <p className='text-xl'>{item.title}</p>
            </div>
          )}

          </div>
        </div>
        <div>
          <Divider />
          <div className='pl-5 flex item-center justify-between  pt-5'>
            <div className='flex items-center space-x-3'>
              <Avatar src='https://media.istockphoto.com/id/499728904/photo/unknown-person-silhouette.jpg?s=2048x2048&w=is&k=20&c=S31QvOKJp4FaEg2tbDCYCxYbyoAQII0kf5CoQ8eFiUg=' />
              <div>
                <p className='font-bold'>{auth.user?.fname + " " + auth.user?.lname}</p>
                <p className='opacity-70'>@{auth.user?.fname.toLowerCase() + " " + auth.user?.lname.toLowerCase()}</p>
              </div>
            </div>
            <div>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default Slidebar