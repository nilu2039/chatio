import { Avatar } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { v4 } from "uuid";
import db from '../firebase';
import "./SidebarChat.css"
const SidebarChat = ( {id, name, addNewChat}) => {
    const [seed, setSeed] = useState("");
    useEffect(() => {
        setSeed(v4);
    }, [])
    const createChat = () => {
        const roomName = prompt("Please Enter name for chat");

        if(roomName) {
            db.collection('room').add({
                name: roomName
            })
        }
    }
    return !addNewChat ? (
        <Link to = {`/rooms/${id}`} style = {{textDecoration: "none"}}>
            <div className = "sidebarChat">
                <Avatar src = {`https://avatars.dicebear.com/api/male/${seed}.svg`}/>
                <div className = "sidebarChat__info">
                    <h2>{name}</h2>
                    <p>Last Message...</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick = {createChat} className = "sidebarChat">
            <h2>Add New Chat</h2>
        </div>
    )
}

export default SidebarChat;
