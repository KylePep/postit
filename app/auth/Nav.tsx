import Link from "next/link";
import Login from "./Login";
import {getSession} from 'next-auth/react'
import {authOptions} from '../../pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth";
import Logged from "./Logged";

export default async function Nav(){
  const session = await getServerSession(authOptions)
  return (
  <nav className="flex justify-between items-center py-8">
    <Link href={"/"}>
      <h1 className="font-bold text-lg">Send it.</h1>
    </Link>
    <ul className="flex item-center gap-6">
      {!session?.user && <Login/>}
      {session?.user && <Logged image={session.user?.image || ""}/>}
    </ul>
  </nav>
  )
}