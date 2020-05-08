import React, { useState, useEffect } from 'react'

const Feed = ({ feedData }) => {
    const [feed, setFeed] = useState('')

    useEffect(feedData => {
      let tweets = ""
      for (const [, tweet] in Object.entries(feedData)){
            tweets = tweets + `\t${tweet}`
      }
      tweets = tweets + "\n"
      setFeed(Object.entries(feed)[0], tweets)
    }, [])

    return (
      <>{feed}</>
    )
}

export default Feed
