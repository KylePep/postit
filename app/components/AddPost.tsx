'use client'

import { useState } from "react"

export default function CreatePost(){
  const [title, setTitle] = useState("")
  return (
    <form action="">
      <div>
        <textarea onChange={(e) => setTitle(e.target.value)} name="title" value={title} placeholder="What's on your mind?"></textarea>
      </div>
    </form>
  )
}