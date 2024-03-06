import prisma  from "../../../prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
){
  if (req.method  === "GET"){
    try {
      console.log(req.query)
      const id = Array.isArray(req.query.details) ? req.query.details[0] : req.query.details;
      
      const data = await prisma.post.findUnique({
        where: {
          id: id,
        },
        include:{
          user: true,
          Comment:{
            orderBy:{
              createdAt: 'desc'
            },
            include:{
              user:true,
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