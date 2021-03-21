import React from 'react'
import Story from './Story'
import './StoryReel.css'

const StoryReel = () => {
    return (
        <div className="storyReel">
            <Story 
                image='https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/119733779/original/cc2e5944473be8570911a5f558f0d28a150e3cdc/paint-you-a-custom-abstract-portrait-drawing-illustration.png'
            profileSrc='https://images.unsplash.com/photo-1610387308877-d8c8d0e9b6f3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTF8fHN0cmVldCUyMGRvZ3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
            title='Sidhant' 
            />
            <Story
                image='https://assets.yellowtrace.com.au/wp-content/uploads/2019/07/25141848/Abstract-Portrait-Paintings-by-Joseph-Lee-Yellowtrace-05.jpg'
                profileSrc='https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                title='Harry'
            />
            <Story
                image='https://cdn.shopify.com/s/files/1/0128/3672/products/DIMENSIONAL_ABSTRACT_PORTRAIT_no._IV_1024x1024.png?v=1507719723'
                profileSrc='https://images.unsplash.com/photo-1588054384802-88b17ab0d288?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzZ8fHN0cmVldCUyMGRvZ3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                title='Simbha'
            />

        </div>
    )
}

export default StoryReel
