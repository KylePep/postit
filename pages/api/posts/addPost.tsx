import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
){
  if (req.method  === "POST"){
    console.log('[REQ, RES, NEXT]', req, res, authOptions)
    const session = await getServerSession(req ,res, authOptions)
    if(!session) return res.status(401).json({message: "Please sign in to make a post"})

    console.log(req.body)
    const title: string = req.body.title

    //Check title
    if (title.length > 300) return(403).json({message: "Please write a shorter message."})
  }
}