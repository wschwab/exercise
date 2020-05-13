import React from 'react'

const Feed = ({ id, tweets }) => {
    return (
      <>
        <ul>
          <span>{id}</span>
          {tweets.map(tweet => (
            <li style={{ listStyleType: "none" }}>&emsp;{tweet}</li>
          ))}

        </ul>
      </>
    )
}

export default Feed
