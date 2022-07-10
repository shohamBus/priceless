import { Button } from "@mui/material"
import { useSession, signIn, signOut } from "next-auth/react"
export default function Session() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
      <strong>
         <span> שלום {session.user.name}</span> 
         <span><Button sx={{backgroundColor: "black",mr:5,p:2,color:"#76e346"}} onClick={() => signOut()}>Sign out</Button>
         </span></strong>
      </>
    )
  }
  return (
    <>
     <strong>
      Not signed in
      <Button sx={{backgroundColor: "black",mr:5,p:2,color:"#76e346"}} onClick={() => signIn("google",{
          redirect:false,
          callbackUrl:`http://localhost:3000/`
      })}>Sign in</Button>
      </strong>
    </>
  )
}