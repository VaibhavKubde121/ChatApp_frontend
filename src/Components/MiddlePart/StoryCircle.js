import React from 'react'
import { Avatar } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

const StoryCircle = () => {
    return (
        <div>
            <div className='flex flex-col items-center mr-4 cursor-pointer'>
                <Avatar sx={{ width: "5rem", height: "5rem" }}
                    src='https://cdn.pixabay.com/photo/2021/09/20/03/24/skeleto>n-6639547_1280.png ' className='flex flex-col items-center mr-4 cursor-pointer'
                >
                    <AddIcon sx={{ fontSize: "3rem" }} />
                </Avatar>
                <p>Vaibhav</p>
            </div>
        </div>
    )
}

export default StoryCircle