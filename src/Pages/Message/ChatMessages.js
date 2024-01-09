
import React from 'react'
import { useSelector } from 'react-redux'

const ChatMessages = ({ item }) => {

    const { message, auth } = useSelector(store => store)
    const isReqUserMessage = auth.user?.id === item.user?.id

    return (
        <div className={`flex ${isReqUserMessage ? "justify-start" : "justify-end"} text-white`}>
            <div className={`p-1 ${item.image ? "rounded-md" : "px-5 rounded-full"} bg-[#191c29]`}>
                {item.image && <img className='w-[12rem] h-[15rem] object-cover rounded-md' src={item.image} alt='' />}
                <p className={`${true ? "py-2" : "py-1"}`}>{item.content}</p>
            </div>
        </div>
    )
}

export default ChatMessages