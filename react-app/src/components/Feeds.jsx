import React, { useState, useEffect } from 'react'
import Feed from './Feed'

const Feeds = () => {
  const [feeds, setFeeds] = useState({})

  useEffect(() => {
    const fetchFeeds = async () => {
      const response = await fetch('/', { accept: 'application/json'})
      const body = await response.json()
      console.log("YO BODY IS: ", body)
      }

    fetchFeeds().then(body => setFeeds(body)).catch(err => err)
  }, [])

  console.log("YO FEEDS[0] IS ", feeds[0])

  return (
    <>
      {feeds.map(feed => (
        <Feed feed={feed} />
      ))},
    </>
  )
}

export default Feeds
