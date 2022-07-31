import { Button } from "@mui/material"
import { useSession, signIn, signOut } from "next-auth/react"
export default function Session() {
  const { data: session } = useSession()
  //sign in with google
  if (session) {
    return (
      <>
      <strong>
         <span> שלום {session.user.name}</span> 
         <span><Button sx={{backgroundColor: "black",mr:5,p:2,color:"#76e346"}} onClick={() => signOut()}>התנתק</Button>
         </span></strong>
      </>
    )
  }
  return (
    <>
     <strong>
      לא מחובר
      <Button sx={{backgroundColor: "black",mr:5,p:2,color:"#76e346"}} onClick={() =>signIn("google",{
          redirect:false,
          callbackUrl:process.env.NEXT_PUBLIC_SERVER_URL
      }) }>התחבר</Button>
      </strong>
    </>
  )
}