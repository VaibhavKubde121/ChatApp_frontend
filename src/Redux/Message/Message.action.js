import * as actionType from "./Message.actionType"
import { api } from "../../Config/Api"

export const createMessage = (reqData) => async (dispatch) => {
    dispatch({ type: actionType.CREATE_MESSAGE_REQUEST })
    try {
        const { data } = await api.post(`/api/messages/chat/${reqData.message.chatId}`, reqData.message);
        reqData.sendMessageToServer(data);
        console.log("Create message : ", data);
        dispatch({ type: actionType.CREATE_MESSAGE_SUCCESS, payload: data })
    }
    catch (error) {
        console.log("Catch error : ", error)
        dispatch({
            type: actionType.CREATE_MESSAGE_FAILURE, payload: error
        })
    }
};


export const createChat = (chat) => async (dispatch) => {
    dispatch({ type: actionType.CREATE_CHAT_REQUEST })
    try {
        const { data } = await api.post(`/api/chats`, chat);
        console.log("Create Chat : ", data);
        dispatch({ type: actionType.CREATE_CHAT_SUCCESS, payload: data })
    }
    catch (error) {
        console.log("Catch error : ", error)
        dispatch({
            type: actionType.CREATE_CHAT_FAILURE, payload: error
        })
    }
};

export const getAllChat = () => async (dispatch) => {
    dispatch({ type: actionType.GET_ALL_CHAT_REQUEST })
    try {
        const { data } = await api.get(`/api/chats`);
        console.log("Get All Chat : ", data);
        dispatch({ type: actionType.GET_ALL_CHAT_SUCCESS, payload: data })
    }
    catch (error) {
        console.log("Catch error : ", error)
        dispatch({
            type: actionType.GET_ALL_CHAT_FAILURE, payload: error
        })
    }
};


