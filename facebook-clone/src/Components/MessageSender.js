import React, { useState } from 'react'
import './MessageSender.css'
import { Avatar, Input } from '@material-ui/core'
import VideocamIcon from '@material-ui/icons/Videocam'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import { useStateValue } from '../StateProvider'
import firebase from 'firebase'
import db from '../firebase'

import FormData from 'form-data'
import axios from '../axios'

const MessageSender = () => {
    const [input, setInput] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [image, setImage] = useState(null)
    const [{ user }, dispatch] = useStateValue()

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (image) {
            const imgForm = new FormData()
            imgForm.append('file', image, image.name)

            axios.post('/upload/image', imgForm, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-Us,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${imgForm._boundary}`
                }
            }).then((res) => { // save the post with data recieved from request
                console.log(res.data);

                const postData = {
                    text: input,
                    imgName: res.data.filename,
                    user: user.displayName,
                    avatar: user.photoURL,
                    timestamp: Date.now()
                }
                console.log(postData);
                savePost(postData)
            })
        } else { // if there is no image 
            const postData = {
                text: input,
                user: user.displayName,
                avatar: user.photoURL,
                timestamp: Date.now()
            }
            console.log(postData);
            savePost(postData)
        }

        setImageUrl('')
        setInput('')
        setImage(null)
    }
    // Function To upload the whole post
    const savePost = async (postData) => {
        await axios.post('/upload/post' , postData)
            .then((resp) => {
                console.log(resp);          
            })
    }

    return (
        <div className='messageSender' >
            <div className="messageSender__top">
                <Avatar src={user.photoURL}/>
                <form>
                    <input type="text"
                        className="messageSender__input"
                        placeholder="What is on your Mind ?"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Input
                        type="file"
                        className="messageSender__fileSelector"
                        onChange={handleChange}
                    />
                    <button onClick={handleSubmit} type="submit"> Submit</button>
                </form>
            </div>
            <div className="messageSender__bottom">
                <div className="messageSender__option">
                    <VideocamIcon style={{ color: 'red' }} />
                    <h3>Live Video</h3>
                </div>
                <div className="messageSender__option">
                    <PhotoLibraryIcon style={{ color: 'green' }} />
                    <h3>Photo/Video</h3>
                </div>
                <div className="messageSender__option">
                    <InsertEmoticonIcon style={{ color: 'orange' }} />
                    <h3>Feeling/Activity</h3>
                </div>
            </div>
        </div>
    )
}

export default MessageSender