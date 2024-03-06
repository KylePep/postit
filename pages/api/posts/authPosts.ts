import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma  from "../../../prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
){
  if (req.method  === "GET"){
    console.log('[REQ, RES, NEXT]', req, res, authOptions)
    const session = await getServerSession(req ,res, authOptions)
    if(!session) return res.status(401).json({message: "Please sign in"})

      // Check if prismaUser exists and has a valid id
      if (!session.user?.email ) {
        return res.status(403).json({ message: "User not found or invalid user ID" })
      }

    // Get Auth Users Posts
    try {
      const data = await prisma.user.findUnique({
        where:{
          email: session.user?.email,
        },
        include: {
          Post: {
            orderBy: {
              createdAt: 'desc'
            },
            include:{
              Comment: true,
            }
          }
        }
      })
      res.status(200).json(data)
    } catch (error) {
      res.status(403).json({err: 'Error has occurred whilst getting posts.'})
      
    }
  }
}