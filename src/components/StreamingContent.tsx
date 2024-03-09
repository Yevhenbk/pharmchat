"use client"

import { FC } from "react"
import { ReactTyped } from "react-typed"

interface StreamingContentProps {
  content: string[],
  loop?: boolean,
  speed?: number
}

const StreamingContent: FC<StreamingContentProps> = ({ content, speed, loop }) => {

  return <ReactTyped strings={content} typeSpeed={speed} loop={loop} />
}

export default StreamingContent