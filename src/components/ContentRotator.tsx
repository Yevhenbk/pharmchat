import React, { useState, useEffect, FC } from "react"
import StreamingContent from "./StreamingContent"

const ContentRotator: FC = () => {
  const contents: string[] = [
    "Ask AI: Can fever-reducing medications prevent febrile seizures?", 
    "Chat: Ibuprofen, purpose - Purpose Pain reliever/fever reducer.",
    "Ask AI: What are the symptoms of anxiety?",
    "Chat: Metoprolol, indications and usage - INDICATIONS AND USAGE Hypertension Metoprolol tartrate tablets, USP are indicated for the treatment of hypertension.",
    "Ask AI: Can depression affect physical health?",
    "Chat: Acetaminophen, ask doctor - Ask a doctor before use if you have liver disease."
  ]
  const [currentContentIndex, setCurrentContentIndex] = useState<number>(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentContentIndex(prevIndex => (prevIndex + 1) % contents.length)
    }, 10000)

    return () => clearInterval(intervalId)
  }, [])

  return <StreamingContent content={[contents[currentContentIndex]]} loop={false} speed={30} />
}

export default ContentRotator

