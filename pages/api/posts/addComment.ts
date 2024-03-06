import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma  from "../../../prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
){
  if (req.method  === "POST"){
    console.log('[REQ, RES, NEXT]', req, res, authOptions)
    const session = await getServerSession(req ,res, authOptions)
    if(!session) return res.status(401).json({message: "Please sign in"})
    
      // Check if prismaUser exists and has a valid id
      if (!session.user?.email ) {
        return res.status(403).json({ message: "User not found or invalid user ID" })
      }
    //Get user
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    })

    const title = req.body.title
    const postId = req.body.postId
    if (title.length > 300) return res.status(403).json({message: "Please write a shorter message."})
    if (!title.length){
      return res.status(403).json({message: "Please enter a comment"})
    }

      // Check if prismaUser exists and has a valid id
      if (!prismaUser || !prismaUser.id) {
        return res.status(403).json({ message: "User not found or invalid user ID" })
      }

    //Add a comment
    try {

      const result = await prisma.comment.create({
        data:{
          message: title,
          userId: prismaUser?.id,
          postId,
        }
      })

      res.status(200).json(result)
    } catch (error) {
      res.status(403).json({err: 'Error has occurred whilst creating comment.'})
      
    }
  }
}