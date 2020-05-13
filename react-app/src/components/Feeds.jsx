import React, { useState, useEffect } from 'react'
import Feed from './Feed'

const Feeds = () => {
  const [feeds, setFeeds] = useState({
    Michael: [
      '@Vitalik: Things like tornado cash and uniswap, kyber and the like are successful in part because they are just tools that people can put into their existing workflows, and not ecosystems. We need more tools that are content with being tools and fewer attempts at ecosystems.',
      '@Kent: For it should never feel the high complexity of the future of preference',
      '@Veronica: Worried about shifting your focus from now another sister will surely become to have bugs, only!'
    ],
    Kent: [
      '@Vitalik: Things like tornado cash and uniswap, kyber and the like are successful in part because they are just tools that people can put into their existing workflows, and not ecosystems. We need more tools that are content with being tools and fewer attempts at ecosystems.'
    ],
    Veronica: [
      '@Vitalik: Things like tornado cash and uniswap, kyber and the like are successful in part because they are just tools that people can put into their existing workflows, and not ecosystems. We need more tools that are content with being tools and fewer attempts at ecosystems.',
      '@Michael: There are only two hard things in Computer Science: cache invalidation, naming things and off-by-1 errors.',
      "@Michael: If your linter tortures you, its complexity and we're building?"
    ],
    Vitalik: [
      '@Veronica: Worried about shifting your focus from now another sister will surely become to have bugs, only!'
    ]
  })

  // useEffect(() => {
  //   const fetchFeeds = async () => {
  //     console.log("fetchFeeds called")
  //     const response = await fetch('/streams', { accept: 'application/json'})
  //     console.log("RESPONSE: ", response)
  //     const body = await response.json()
  //     console.log("BODY: ", body)
  //     if (response.status !== 200) throw Error(body.message)
  //
  //     return body
  //     }
  //
  //   fetchFeeds().then(body => setFeeds(body)).catch(err => err)
  // }, [])

  // console.log("YO FEEDS IS ", feeds)

  return (
    <>
      {feeds && Object.keys(feeds).map(feed => {

        return (
          <Feed id={feed} tweets={feeds[feed]} />
        )
      })},
    </>
  )
}

export default Feeds
