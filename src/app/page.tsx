import prisma from "@/lib/db";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components"

interface Question {
  id: number;
  text: string;
  kindeAuthId: string;
}

export default async function Home() {

  const questions = await prisma.question.findMany({
    where: {
      kindeAuthId: '123456'
    },
  })

  async function addQuestion(formData: FormData) { 
    "use server"

    await prisma.question.create({
      data: {
        text: formData.get("questionText") as string,
        kindeAuthId: "123456" as string,
      },
    });
  }
  

  return (
    <div>
      <LoginLink>Sign in</LoginLink>
      <RegisterLink>Sign up</RegisterLink>
      <form action={addQuestion} className="w-[500px] flex flex-col">
      <textarea
        name="questionText"
        rows={5}
        placeholder="Ask your question"
        className="px-3 py-2"
        spellCheck={false}
      />

      <button
        type="submit"
        className="bg-zinc-900 text-white  py-2 px-5 rounded-md mt-2"
      >
        Submit question
      </button>
    </form>
      <h1>Questions</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>{question.text}</li>
        ))}
      </ul>
    </div>
  );
}