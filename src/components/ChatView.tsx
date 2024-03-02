import { FC, ReactNode } from "react"

interface ChatViewProps {
  children: ReactNode
}

const ChatView: FC<ChatViewProps> = ({children}) => {
  return (
    <div className="relative flex grow flex-col items-center justify-between px-5 py-8 text-white 
    bg-black sm:rounded-t-[30px] md:rounded-none md:px-6 md:border-l-[1px] border-[#27272a] w-full">
      <div className="relative flex w-full grow flex-col items-center justify-center gap-4">
        <h2 className="text-center text-xl leading-[1.2] md:text-2xl md:leading-8 font-bold">
          Get Started
        </h2>
        <p className="text-center text-sm leading-[1.2] md:text-md md:leading-4 text-[#94949D] font-medium
        mb-4 w-[80%]">
          This is an open source AI chatbot app template built with Next.js, Open Assistant AI, and Prisma.
        </p>
        <div className="mt-2 w-full max-w-[440px]">
          <div className="grid gap-x-3 gap-y-2 sm:gap-y-0 h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatView