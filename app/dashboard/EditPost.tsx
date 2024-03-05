'use client'
import Image from "next/image"
import { useState } from "react"
import Toggle from "./toggle"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import axios from "axios"

type EditProps = {
  id: string
  avatar: string
  name: string
  title: string
  comments?:{
    id: string
    postId:string
    userId: string
  }[]
}

export default function EditPost({avatar,name,title,comments,id}: EditProps){
  let toastPostID: string

  //Toggle
  const [toggle, setToggle] = useState(false)

  //Delete Post
  
  const removePost = async ()=>{
    try {
      const response = await axios.delete("/api/posts/deletePost", {data: id})
      console.log(response.data)
      return response
    } catch (error: any) {
      throw new Error(error.response.data.message)
    }
  }
  
  const mutation = useMutation({
  mutationFn: removePost,
  onMutate(variables) {
    toastPostID = toast.loading(`Creating your post`)
  },
  onError(error, variables, context) {
    console.log('[ERROR]',error)
    toast.error(error?.message, {id: toastPostID})
  },
  onSuccess(data, variables, context) {
    console.log(data)
    toast.success(`Post has been deleted`, {id: toastPostID})
    // queryClient.invalidateQueries(["posts"])
  }
})
const deletePost  = ()=>{
  mutation.mutate()
}
    return(
      <>
      <div className="bg-white my-8 p-8 rounded-lg">
        <div className="flex items-center gap-2">
        <Image
        className="rounded-full"
        width={32}
        height={32}
        src={avatar}
        alt="avatar"
        />
        <h3 className="font-bold text-gray-700">{name}</h3>
        </div>
        <div className="my-8">
          <p className="break-all">{title}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm font-bold text-gray-700">
            {Comment?.length}
          </p>
          <button onClick={(e) =>{setToggle(true)}} className="text-sm font-bold text-red-500">Delete</button>
        </div>
      </div>
      {toggle && <Toggle deletePost = {deletePost} setToggle = {setToggle} />}
      </>
    )
}