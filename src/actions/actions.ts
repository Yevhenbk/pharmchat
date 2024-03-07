"use server"

import prisma from "@/lib/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export async function addChat(formData: FormData) {
  const { isAuthenticated, getUser } = getKindeServerSession()
  const isLoggedIn = await isAuthenticated()
  if (!isLoggedIn) {
    redirect("/api/auth/login")
  }
  const user = await getUser()

  await prisma.chat.create({
    data: {
      chatTitle: formData.get("chatTitle") as string,
      kindeAuthId: user?.id as string,
    },
  })

  revalidatePath("/chat")
}

// export async function addMessage(chatId: number, question: string, response: string) {
//   const { isAuthenticated, getUser } = getKindeServerSession();
//   const isLoggedIn = await isAuthenticated();
//   if (!isLoggedIn) {
//     redirect("/api/auth/login");
//   }

//   const user = await getUser();

//   await prisma.message.create({
//     data: {
//       chat: {
//         connect: {
//           id: chatId
//         },
//       },
//       kindeAuthId: user?.id as string,
//       question: question,
//       response: response,
//     },
//   });

//   revalidatePath(`/chat/${chatId}`);
// }

export async function deleteChat(chatId: number) {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  await prisma.chat.delete({
    where: {
      id: chatId,
    },
  });

  revalidatePath("/chat");
}

export async function deleteMessage(messageId: number) {
  const { isAuthenticated, getPermission } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  const requiredPermission = await getPermission("delete:message");
  if (!requiredPermission?.isGranted) {
    redirect("/dashboard");
  }

  await prisma.message.delete({
    where: {
      id: messageId,
    },
  });

  revalidatePath("/admin-area");
}






////
// pages/api/createMessage.js

export async function addMessage(chatId: number, question: any, response: string) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  const user = await getUser();

  await prisma.message.create({
    data: {
      chat: {
        connect: {
          id: chatId
        },
      },
      kindeAuthId: user?.id as string,
      question: question,
      response: String(response),
    },
  });

  revalidatePath(`/chat/${chatId}`);
}

export async function getMedication(chatId: number, genericName: string, selectedInfo: string | null = null) {
  const res = await fetch(`https://api.fda.gov/drug/label.json?api_key=t62Chde4gVkYohphhcmfh6VKb0aH4i2nBaSasURK&search=openfda.generic_name:${genericName}&limit=1`)

 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  const jsonData = await res.json()

  if (!selectedInfo) {
    return "jsonData"
  }

  const normalizedInfo = normalizeProperty(selectedInfo);

  const selectedData = jsonData.results.map((result: any) => (
    result[normalizedInfo]));

  if (selectedData) {
    await addMessage(chatId, genericName, selectedData)
  }

  return { ...jsonData, results: selectedData }
}

function normalizeProperty(property: any) {
  const underscoredProperty = property.replace(/\s+/g, '_').toLowerCase();
  return property.toLowerCase() === underscoredProperty ? property : underscoredProperty;
}