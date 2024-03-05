'use client'

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"

export default function CreatePost(){
  const [title, setTitle] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const queryClient = useQueryClient();
  let toastPostID: string

  const submitPost  = async (e: React.FormEvent)=> {
    e.preventDefault()
    setIsDisabled(true)
    mutation.mutate()
    }

// Create a post
const createPost = async ()=>{
  try {
    const response = await axios.post("/api/posts/addPost", {title})
    console.log(response.data)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

const mutation = useMutation({
  mutationFn: createPost,
  onMutate(variables) {
    toastPostID = toast.loading(`Creating your post ${toastPostID}`)
  },
  onError(error, variables, context) {
    console.log('[ERROR]',error)
    toast.error(error?.message + toastPostID, {id: toastPostID})
    setIsDisabled(false)
  },
  onSuccess(data, variables, context) {
    console.log(data)
    toast.success(`Post has been made ${toastPostID}`, {id: toastPostID})
    setTitle('')
    setIsDisabled(false)
  }
}
)




  return (
    <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md">
      <div className="flex flex-col my-4">
        <textarea onChange={(e) => setTitle(e.target.value)} name="title" value={title} placeholder="What's on your mind?" className="p-4 text-lg rounded-md my-2 bg-gray-200"></textarea>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p className={`font-bold text-sm ${title.length > 300 ? "text-red-700" : "text-gray-700"}`}>{`${title.length}/300`}</p>
        <button disabled={isDisabled} className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25" type="submit">Create a post</button>
      </div>
    </form>
  )
}