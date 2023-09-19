import React from 'react'

type ProfilePicProps = {
    imageUrl : string
}

export default function ProfilePic(props: ProfilePicProps) {
  return (
    <div><img src={props.imageUrl} alt='User pfp' style={{borderRadius:"50%"}}></img></div>
  )
}
