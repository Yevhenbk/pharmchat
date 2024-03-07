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

export async function addMessage(chatId: number, question: string, response: string) {
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
      response: response,
    },
  });

  revalidatePath(`/chat/${chatId}`);
}

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

export async function createMedicationMessage(formData: FormData, chatId: number) {
  const question = formData.get("question") as string

  try {
    // Make a POST request to get medication information
    const medicationInfoResponse = await getMedicationInfo(question);

    // Create a message in the database
    const createMessageResponse = await createMessageInDatabase(chatId, question, medicationInfoResponse);

    return NextResponse.json(createMessageResponse);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

async function getMedicationInfo(userQuestion: string) {
  try {
    // Extract medication name and selected_info from the user's question
    const match = userQuestion.match(/^([\w\s]+),\s*([\w\s]+)$/)
    if (!match) {
      throw new Error('Invalid input format. Please provide both medication name and selected information separated by a comma (e.g., Aspirin, Warnings).');
    }

    const medicationName = match[1];
    const selectedInfo = (match[2] || '').toLowerCase() || 'full_info';

    // Replace spaces with underscores in selectedInfo
    const selectedInfoKey = selectedInfo.replace(' ', '_').toLowerCase();

    // Modify the API key handling and request format based on your medication data API requirements
    const endpoint = `https://api.fda.gov/drug/label.json?api_key=t62Chde4gVkYohphhcmfh6VKb0aH4i2nBaSasURK&search=openfda.generic_name:${medicationName}&limit=1`;

    const response = await fetch(endpoint);
    const data = Response.json(response);

    if ('results' in data && Array.isArray(data.results) && data.results.length > 0) {
      const medicationData = data.results[0] as Record<string, unknown>; // Type assertion
      const formattedInfo = formatMedicationInfo(medicationData, selectedInfoKey);
      return formattedInfo;
    } else {
      return `No information found for ${medicationName}.`;
    }
  } catch (error) {
    throw new Error(`Error fetching medication information`);
  }
}

function formatMedicationInfo(data: any, selectedInfo: string | null = null) {
  try {
    let formattedInfo = `Information about ${data.openfda.generic_name[0]}:\n`;

    if (!selectedInfo) {
      formattedInfo += `Active Ingredient: ${data.active_ingredient.join(', ')}\n`;
      formattedInfo += `Purpose: ${data.purpose.join(', ')}\n`;
      formattedInfo += `Indications and Usage: ${data.indications_and_usage.join(', ')}\n`;
      // Add other fields as needed
    } else {
      if (selectedInfo in data) {
        formattedInfo += `${data[selectedInfo].join(', ')}\n`;
      } else {
        formattedInfo += `Selected information '${selectedInfo}' not found.\n`;
      }
    }

    return formattedInfo;
  } catch (error) {
    throw new Error('Error formatting medication information.');
  }
}

async function createMessageInDatabase(chatId: number, userQuestion: string, medicationInfoResponse: string) {
  try {
    // Make a POST request to create a message in the database
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
        question: userQuestion,
        response: medicationInfoResponse
    }});

    revalidatePath(`/chat/${chatId}`)
  } catch (error) {
    throw new Error(`Error creating message in the database`);
  }
}
