'use client'

import { PostType } from "@/app/Types/Post"
import AddComment from "@/app/components/AddComment"
import Post from "@/app/components/Posts"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"

type URL = {
  params: {
    slug: string
  }
}

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`)
  return response.data
}

export default function PostDetail(url:URL){
  const {data, isLoading} = useQuery<PostType>({
    queryKey: ['comments'],
    queryFn: ()=> fetchDetails(url.params.slug)
  })
  if(isLoading) return "Loading..."
  console.log('[COMMENT DATA]',data)
  return (
    <div>
      {data && (
        <Post id={data.id} name={data.user.name} avatar={data.user.image} postTitle={data.title} Comment={data.Comment} />
      )}
      <AddComment id={data?.id}/>
      {data?.Comment?.map((comment) => (
        <div key={comment.id} className="my-6 bg-white p-8 rounded-md">
            <div className="flex items-center gap-2">
              <Image className="rounded-full" width={24} height={24} src={comment.user?.image} alt="avatar"/>
            <h3 className="font-bold">{comment?.user?.name}</h3>
            <h2 className="text-sm"> {comment.createdAt}</h2>
            </div>
            <div>{comment.message}</div>
        </div>
      ))}
    </div>
  )
}