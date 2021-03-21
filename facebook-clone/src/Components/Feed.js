import React, { useEffect, useState } from 'react'
import MessageSender from './MessageSender'
import Post from './Post'
import StoryReel from './StoryReel'
import './Feed.css'

import axios from '../axios'
import Pusher from 'pusher-js'

const pusher = new Pusher('ebb185556f4b170b143d', {
    cluster: 'ap2'
});

const Feed = () => {
    const [profilePic, setProfilePic] = useState('')
    const [postsData, setPostsData] = useState([])

    // to get all the post
    const syncFeed = () => {
        axios.get('/retrieve/posts')
            .then((res) => {
                console.log(res.data);
                setPostsData(res.data)
                console.log(postsData);
            })
    }

    useEffect(() => {
        //posts is channel name that we just created using pusher
        const channel = pusher.subscribe('posts');
        channel.bind('inserted', function(data) {
            syncFeed()
        });
    }, [])

    useEffect(() => {
        syncFeed()
    }, [])

    return (
        <div className="feed">
            <StoryReel />
            <MessageSender />
            {postsData.map(entry => (
                <Post
                    profilePic={entry.avatar}
                    message={entry.text}
                    timestamp={entry.timestamp}
                    imgName={entry.imgName}
                    username={entry.user}
                />
            ))}
        </div>
    )
}

export default Feed
