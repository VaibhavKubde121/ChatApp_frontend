
import { Avatar, Card, CardHeader } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../../Redux/Auth/auth.action';
import { createChat } from '../../Redux/Message/Message.action';

const SearchUser = () => {
    const [username, setuserName] = useState('');
    const dispatch = useDispatch();
    const {message,auth} =useSelector(store=>store)

    const handleSearchUser = (e) => {
        setuserName(e.target.value)
        console.log("username : ", username)
        dispatch(searchUser(username))

    }
    const handleClick = (id) => {
        dispatch(createChat({userId:id}))
    }
    return (
        <div>
            <div className='py-5 relative'>
                <input className='bg-transparent border border-[#3b4054]
            outline-none w-full px-5 py-3 rounded-full '
                    placeholder='Search User..' onChange={handleSearchUser} type='text' />
                {username && 
                (
                    auth.searchUser.map((item)=>
                        <Card  key={item.id} className='absolute w-full z-10 top-[4.5rem] cursor-pointer'>
                            <CardHeader onClick={() => {
                                handleClick(item.id)
                                setuserName('')
                            }}
                                avatar={<Avatar src='https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png' />}
                                title={item.fname + " "+ item.lname}
                                subheader={item.fname.toLowerCase() + " " + item.lname.toLowerCase()}
                            />
                        </Card>)
                )}
            </div>

        </div>
    )
}

export default SearchUser