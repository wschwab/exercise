import React, { useState, useEffect } from 'react'
import Feed from './Feed'

const Feeds = () => {
  const [feeds, setFeeds] = useState()

  useEffect(() => {
    fetch('/', { accept: 'application/json'})
    .then(res => {
      console.log(res)
      setFeeds(res)
    })
    .catch(err => console.error(err))
  }, [])

  return (
    <>
      {feeds.map(feed => (
        <Feed feed={feed} />
      ))},
    </>
  )
}

export default Feeds
