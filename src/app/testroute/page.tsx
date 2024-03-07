import { getMedication } from "@/actions/actions"
import prisma from "@/lib/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

 
export default async function Testroute() {
  const { isAuthenticated, getUser } = getKindeServerSession()
  const isLoggedIn = await isAuthenticated()
  if (!isLoggedIn) {
    redirect("/api/auth/login")
  }

  const user = await getUser()
  // const data = await getMedication(4, 'ibuprofen', 'purpose')

  const messages = await prisma.message.findMany({
    where: {
      kindeAuthId: user?.id,
      chatId: 4
    },
  })

  console.log(messages)

  return (
        <div className="text-black">
        {messages && Array.isArray(messages) ? (
          messages.map((m: any) => (
            <div key={m.id}>
              {m.question}
              {m.response}
            </div>
          ))
        ) : (
          <></>
        )}
        </div>
  );
}