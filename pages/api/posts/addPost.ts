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
    if(!session) return res.status(401).json({message: "Please sign in to make a post"})

    const title: string = req.body.title

    // Check if prismaUser exists and has a valid id
    if (!session.user?.email ) {
      return res.status(403).json({ message: "User not found or invalid user ID" })
    }

    const prismaUser = await prisma.user.findUnique({
      where: {email: session?.user?.email}
    })

    //Check title
    if (title.length > 300) return res.status(403).json({message: "Please write a shorter message."})
    if(!title.length)
    return res.status(403).json({message: "Please do not leave this empty."})

    // Check if prismaUser exists and has a valid id
    if (!prismaUser || !prismaUser.id) {
      return res.status(403).json({ message: "User not found or invalid user ID" })
    }

    // Create post
    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: prismaUser?.id,
        }
      })
      res.status(200).json(result)
    } catch (error) {
      res.status(403).json({err: 'Error has occurred whilst making a post.'})
      
    }
  }
}