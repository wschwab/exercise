import React, { useState, useEffect } from 'react'
import Feed from './Feed'

const Feeds = () => {
  const [feeds, setFeeds] = useState({})

  useEffect(() => {
    const fetchFeeds = async () => {
      console.log("fetchFeeds called")
      const response = await fetch('/streams', { accept: 'application/json'})
      console.log("RESPONSE: ", response)
      const body = await response.json()
      console.log("BODY: ", body)
      if (response.status !== 200) throw Error(body.message)

      return body
      }

    fetchFeeds().then(body => setFeeds(body)).catch(err => err)
  }, [])

  console.log("YO FEEDS IS ", feeds)

  return (
    <>
      {feeds && Object.keys(feeds).map(feed => (
        <Feed feed={feed} />
      ))},
    </>
  )
}

export default Feeds
