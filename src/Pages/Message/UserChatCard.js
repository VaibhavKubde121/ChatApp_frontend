
import { Avatar, Card, CardHeader, IconButton } from '@mui/material'
import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSelector } from 'react-redux';

const UserChatCard = ({ chat }) => {

    const { message, auth } = useSelector(store => store)
    // console.log("fname : ", chat.users[1].fname)
    // console.log("fname : ", chat.users[1].lname)
    // console.log("error :", auth.user.id)
    // console.log("eroor : ", chat.users[0].id)
    // console.log("fname : ", chat.users[0].fname)
    // console.log("fname : ", chat.users[0].lname)

    return (
        <Card>
            <CardHeader avatar={
                <Avatar
                    sx={{ width: "3.5rem", height: "3.5rem", fontSize: "1.5rem", bgcolor: "191c29", color: "rgb(88,199,250" }}
                    src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" />
            }
                action={
                    <IconButton>
                        <MoreHorizIcon />
                    </IconButton>
                }
                title={auth.user?.id === chat.users[1].id ? chat.users[0].fname + " " +
                    chat.users[0].lname : chat.users[1].fname + " " + chat.users[1].lname}
                subheader={"new message"}
            >

            </CardHeader>
        </Card>

    )
}

export default UserChatCard