import { NextPage } from "next"
import prisma from "@/lib/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import { getMedication } from "@/actions/actions"
import LogoNav from "@/components/LogoNav"
import ChatWindow from "@/components/chatbot/ChatWindow"
import SubmitMessage from "@/components/chatbot/SubmitMessage"
import Caption from "@/components/Caption"
import logo from "../../../../public/pharmchat.svg"

interface PageProps {
  params: {
    id: string
  }
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const id = parseInt(params.id)
  const { isAuthenticated, getUser } = getKindeServerSession()
  const isLoggedIn = await isAuthenticated()

  if (!isLoggedIn) {
    redirect("/api/auth/login")
  }

  const user = await getUser()
  const messages = await prisma.message.findMany({
    where: {
      kindeAuthId: user?.id,
      chatId: id
    },
  })

  return (
    <div className="bg-black h-[100dvh] w-full flex flex-col justify-between
    items-center">
      <LogoNav logo={logo} />
      <ChatWindow messages={messages} modalDescription="This is a chatbot using FDA drug label API 
      that provides reasonable response on the request over desired medication. In order to 
      get the information you need to provide a medication name followed by requested result." 
      modalResponse="The list of possible requested results is: purpose, keep out of reach of children, 
      warnings, questions, spl product data elements, version, dosage and administration, pregnancy or breast feeding, 
      stop use, storage and handling, do not use, package label principal display panel, active ingredient, indications 
      and usage; if not specified, returns purpose as a default property." modalTitle="Welcome to Pharmchat Chatbot!" />
      <SubmitMessage id={id} handleSubmit={getMedication} placeholder="Ex. Ibuprofen, purpose..." />
      <Caption text="Medication information from the"
      linkText="FDA drug label API" link="https://open.fda.gov/apis/" />
    </div>
  )
}

export default Page