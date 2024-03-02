"use server"

import prisma from "@/lib/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

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

  revalidatePath("/dashboard")
}

export async function addMessage(formData: FormData) {
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
          id: parseInt(formData.get("chatId") as string, 10),
        },
      },
      kindeAuthId: user?.id as string,
      question: formData.get("question") as string,
      response: formData.get("response") as string,
    },
  });

  revalidatePath("/dashboard");
}

export async function deleteChat(chatId: number) {
  const { isAuthenticated, getPermission } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  const requiredPermission = await getPermission("delete:chat");
  if (!requiredPermission?.isGranted) {
    redirect("/dashboard");
  }

  await prisma.chat.delete({
    where: {
      id: chatId,
    },
  });

  revalidatePath("/admin-area");
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