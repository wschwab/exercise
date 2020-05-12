import React, { useState, useEffect } from 'react'

const Feed = ({ feedData }) => {
    const [feed, setFeed] = useState('')

    useEffect(feedData => {
      let user = Object.entries(feedData)[0][0]
      let tweets = `${user}\n`
      for (const [, tweet] in Object.entries(feedData)){
            tweets = tweets + `\t${tweet}`
      }
      tweets = tweets + "\n"
      setFeed(tweets)
    }, [])

    return (
      <>{feed}</>
    )
}

export default Feed
