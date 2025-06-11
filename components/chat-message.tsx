"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { format } from "date-fns"

interface ChatMessageProps {
  message: {
    id: string
    role: "user" | "assistant"
    content: string
    timestamp: Date
  }
  delay?: number
}

export function ChatMessage({ message, delay = 0 }: ChatMessageProps) {
  const isUser = message.role === "user"
  const formattedTime = format(new Date(message.timestamp), "h:mm a")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div className={`flex gap-3 max-w-[80%] ${isUser ? "flex-row-reverse" : ""}`}>
        <Avatar className="h-8 w-8 flex-shrink-0">
          {isUser ? (
            <>
              <AvatarFallback>U</AvatarFallback>
              <AvatarImage src="/user-avatar.png" />
            </>
          ) : (
            <>
              <AvatarFallback>AI</AvatarFallback>
              <AvatarImage src="/ai-avatar.png" />
            </>
          )}
        </Avatar>
        <div className="flex flex-col">
          <div
            className={`rounded-2xl px-4 py-2 shadow-sm ${
              isUser ? "bg-blue-500 text-white rounded-tr-none" : "bg-gray-100 text-gray-800 rounded-tl-none"
            }`}
          >
            <p className="text-sm">{message.content}</p>
          </div>
          <span className={`text-xs text-gray-500 mt-1 ${isUser ? "text-right" : "text-left"}`}>{formattedTime}</span>
        </div>
      </div>
    </motion.div>
  )
}
