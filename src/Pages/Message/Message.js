
import { Avatar, Backdrop, CircularProgress, Grid, IconButton } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import WestIcon from '@mui/icons-material/West';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SearchUser from '../../Components/SearchUser/SearchUser';
import UserChatCard from './UserChatCard';
import ChatMessages from './ChatMessages';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, getAllChat } from '../../Redux/Message/Message.action';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { uploadToCloudniry } from '../../Utils/UploadToCloudniry';
import SockJS from 'sockjs-client';
import Stom from 'stompjs';
import { useNavigate } from 'react-router-dom';

const Message = () => {

    const dispatch = useDispatch();
    const { message, auth } = useSelector(store => store)
    const [currentChat, setCurrentChat] = useState();
    const [messages, setMessages] = useState([]);
    const [selectedImage, setSelectedImage] = useState();
    const [loading, setLoading] = useState(false);
    const [stompClient, setStomClient] = useState(null);
    const chatConatinerRef = useRef(null);

    useEffect(() => {
        dispatch(getAllChat())
    }, [])

    const navigate=useNavigate();

    const onhome =()=>{
        navigate('/')
    }

    const handleCreateMessage = (value) => {

        const message = {
            chatId: currentChat?.chat_id,
            content: value,
            image: selectedImage
        };
        console.log("id===", message)
        dispatch(createMessage({ message, sendMessageToServer }));
    }

    const onConnect = () => {
        console.log("websocket connect");
    }

    const onError = (error) => {
        console.log("error ", error)
    }

    useEffect(() => {
        if (stompClient && auth.user && currentChat) {
            const subscription = stompClient.subscribe(`/user/${currentChat?.chat_id}/private`, onMessageReice(currentChat));
        }
    }, [])

    const onMessageReice = (payload) => {
        const recivedMessage = JSON.parse(payload.body);
        console.log("message recived from websocket ", recivedMessage);
        setMessages([...messages, recivedMessage]);
    }

    const sendMessageToServer = (newMessage) => {
        if (stompClient && newMessage) {
            stompClient.send(`/app/chat/${currentChat?.chat_id.toString()}`, {}, JSON.stringify(newMessage));
        }
    }

    console.log("Chats -----> ", message.chats)

    const handleSelectImage = async (e) => {
        setLoading(true)
        console.log("handle select image");
        const imgUrl = await uploadToCloudniry(e.target.files[0], "image")
        setSelectedImage(imgUrl)
    }

    useEffect(() => {
        setMessages([...messages, message.message])
    }, [message.message])



    useEffect(() => {
        const sock = new SockJS("http://localhost:9090/ws")
        const stomp = Stom.over(sock);
        setStomClient(stomp);
        stomp.connect({}, onConnect, onError)
    }, [])

    useEffect(() => {
        if (chatConatinerRef.current) {
            chatConatinerRef.current.scrollTop = chatConatinerRef.current.scrollHeight;
        }
    }, [messages])

    return (
        <div>
            <Grid container className='h-screen overflow-hidden'>
                <Grid className='px-5' item xs={3}>
                    <div className='flex h-full justify-between space-x-2'>
                        <div className='w-full'>
                            <div className='flex space-x-4 items-center py-5'>
                                <WestIcon onClick={onhome} className='cursor-pointer'/>
                                <h1 className='text-xl font-bold'>Home</h1>
                            </div>
                            <div className='h-[83vh]'>
                                <div className=''>
                                    <SearchUser />
                                </div>
                                <div className='h-full space-y-4 mt-5 overflow-y-scroll hideScrollbar'>
                                    {
                                        message.chats.map((item) => {
                                            return <div onClick={() => {
                                                setCurrentChat(item)
                                                setMessages(item.messages)
                                            }}>
                                                <UserChatCard chat={item} key={item.chat_id} />
                                            </div>
                                        }

                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid className='h-full' item xs={9}>
                    {
                        currentChat ? <div>
                            <div className='flex justify-between items-center border-1 p-5'>
                                <div className='flex items-center space-x-3'>
                                    <Avatar src='https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png' />
                                    <p>
                                        {auth.user?.id === currentChat.users[0].id ? currentChat.users[1].fname + " " +
                                            currentChat.users[1].lname : currentChat.users[0].fname + " " + currentChat.users[0].lname}
                                    </p>
                                </div>
                                <div className='flex space-x-3'>
                                    <IconButton>
                                        <AddIcCallIcon />
                                    </IconButton>
                                    <IconButton>
                                        <VideoCallIcon />
                                    </IconButton>
                                </div>
                            </div>
                            <div ref={chatConatinerRef} className='hideScrollbar overflow-y-scroll h-[82vh] px-2 space-y-5 py-5'>
                                {
                                    messages.map((item) =>
                                        <ChatMessages item={item} key={item.chat_id} />
                                    )}
                            </div>
                            <div className='sticky bottom-0 border-1'>
                                {
                                    selectedImage &&
                                    < img className='w-[5rem] h-[5rem] object-cover px-2'
                                        src={selectedImage} alt='' />
                                }
                                <div className='py-5 flex items-center justify-center space-x-5'>

                                    <input
                                        onKeyPress={(e) => {
                                            if (e.key === "Enter" && e.target.value) {
                                                handleCreateMessage(e.target.value)
                                                e.target.value=''
                                                setSelectedImage("")
                                            }
                                        }}
                                        className='bg-transparent border border-[#3b40544] rounded-full w-[90%] py-3 px-5 '
                                        placeholder='Type message...' type='text' />
                                    <div>
                                        <input type='file' accept='image/*' onChange={handleSelectImage}
                                            className='hidden' id='image-input' />
                                        <label htmlFor='image-input'>
                                            <AddPhotoAlternateIcon />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                            :
                            <div className='h-full space-y-5 flex flex-col justify-center items-center'>
                                <ChatBubbleOutlineIcon sx={{ fontSize: "15 rem" }} />
                                <p className='text-xl font-semibold'>No Chat Selected</p>
                            </div>
                    }
                </Grid>
            </Grid>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />

            </Backdrop>
        </div>
    )
}

export default Message