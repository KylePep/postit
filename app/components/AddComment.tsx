'use client'

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"

type PostProps = {
  id?: string
}

export default function AddComment({id} : PostProps){
  const [title, setTitle] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const queryClient = useQueryClient()
  let commentToastID: string

  const submitComment  = async (e: React.FormEvent)=> {
    e.preventDefault()
    setIsDisabled(true)
    mutation.mutate()
    }

// Create a post
const createComment = async ()=>{
  try {
    const response = await axios.post("/api/posts/addComment", {title, postId: id})
    console.log(response.data)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

const mutation = useMutation({
  mutationFn: createComment,
  onMutate(variables) {
    commentToastID = toast.loading(`Creating your comment `)
  },
  onError(error, variables, context) {
    toast.error(error?.message , {id: commentToastID})
    setIsDisabled(false)
  },
  onSuccess(data, variables, context) {
    toast.success(`Comment has been made `, {id: commentToastID})
    queryClient.invalidateQueries({queryKey: ["comments"]})
    setTitle('')
    setIsDisabled(false)
  }
})

  return(
    <form onSubmit={submitComment} className="bg-white my-8 p-8 rounded-md">
      <h3>Add a comment.</h3>
      <div className=" flex flex-col my-2">
        <input onChange={(e) => setTitle(e.target.value)} 
        value={title}
        type="text"
        name="title"
        className="bg-gray-300 p-4 text-lg rounded-md my-2 "
        placeholder="what's your comment?"
        />
      </div>
      <div className="flex items-center gap-2">
        <button  disabled={isDisabled}
        className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
        >
          Add Comment
        </button>
        <p className={`font-bold ${title.length > 300 ? "text-red-700" : "text-gray-700" }`}>
        {`${title.length}/300`}
        </p>
      </div>
    </form>

)
}