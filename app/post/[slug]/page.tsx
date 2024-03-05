'use client'

import { PostType } from "@/app/Types/Post"
import AddComment from "@/app/components/AddComment"
import Post from "@/app/components/Posts"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

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
  const {data, isLoading} = useQuery<PostType[]>({
    queryKey: ['detail-post'],
    queryFn: ()=> fetchDetails(url.params.slug)
  })
  if(isLoading) return "Loading..."
  console.log(data)
  return (
    <div>
      <Post id={data.id} title={data.title} name={data.user.name} avatar={data.user.image} postTitle={data.title} comments={data.Comment} />
      <AddComment/>
    </div>
  )
}