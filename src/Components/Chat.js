import { Avatar, IconButton } from '@material-ui/core'
import React, {useEffect, useState, useRef} from 'react'
import "./Chat.css"
import {v4} from "uuid";
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import firebase from "firebase"
import { useStateValue } from './userContext';
import { actionTypes } from './reducer';
const Chat = () => {
    const dummy = useRef();
    const [input, setInput] = useState();
    const [seed, setSeed] = useState();
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([])
    const [{user, lastMessage}, dispatch] = useStateValue();
    useEffect(() => {
        if(roomId) {
            db.collection('room').doc(roomId).onSnapshot((snapshot) => {
                setRoomName(snapshot.data().name)
            })

            db.collection('room').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
            dispatch({
                type: actionTypes.SET_MESSAGE,
                lastMessage: messages[messages.length-1]?.message,
            })
        }
    }, [roomId]);

    useEffect (() => {
        setSeed(v4());
    }, [])

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('room').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            uid: user.uid,  
        })
        setInput("");
        dummy.current.scrollIntoView({behavior: 'smooth'});
    }
    return (
        <div className = "chat">
            <div className = "chat__header">
                <Avatar src = {`https://avatars.dicebear.com/api/male/${seed}.svg`}/>
                <div className = "chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className = "chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className = "chat__body">
                    {messages.map((message) => (
                        <p className = {`chat__message ${message.uid === user.uid && `chat__receiver`}`} >
                            <span className = "chat__name">{message.name}</span>
                            {message.message}
                            <span className = "chat__timestamp">
                                {new Date(message.timestamp?.toDate()).toUTCString()}
                            </span>
                        </p>
                    ))}
                    <div ref = {dummy}></div>
            </div>
            <div className = "chat__footer">
                <IconButton>
                    <InsertEmoticon />
                </IconButton>
                <form>
                    <input 
                        type = "text" 
                        placeholder = "Type a message" 
                        value = {input} 
                        onChange = {(e) => setInput(e.target.value)}
                    />
                    <button type = "submit" onClick = {sendMessage}>SEND</button>
                </form>
                <IconButton>
                    <Mic />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
