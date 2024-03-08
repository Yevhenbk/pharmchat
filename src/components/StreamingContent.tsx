"use client"

import { useState, useEffect, FC } from "react"

interface StreamingContentProps {
  content: string,
  loop?: boolean
}

const StreamingContent: FC<StreamingContentProps> = ({ content, loop }) => {
  const [displayedContent, setDisplayedContent] = useState("")

  useEffect(() => {
    let isMounted = true

    const streamContent = async () => {
      const words = content.split(" ")

      for (let i = 0; i < words.length; i++) {
        // Delay each word to create a streaming effect
        await new Promise(resolve => setTimeout(resolve, 500))

        if (isMounted) {
          setDisplayedContent(prevContent => prevContent + words[i] + (i < words.length - 1 ? " " : ""))
        }
      }

      if (loop && isMounted) {
        setDisplayedContent("")
        streamContent()
      }
    }

    streamContent()

    return () => {
      isMounted = false
    }
  }, [content, loop])

  return <p>{displayedContent}</p>
}

export default StreamingContent