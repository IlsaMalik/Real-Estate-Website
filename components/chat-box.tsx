"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Send, Mic, Home, TrendingUp, Calculator, MapPin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ChatMessage } from "./chat-message"
import { PropertyCard } from "./property-card"
import { VoiceWaveform } from "./voice-waveform"
import { MarketTrendsMini } from "./market-trends-mini"
import Image from "next/image"
import { filterProperties } from "@/data/properties"

interface ChatBoxProps {
  isOpen: boolean
  onClose: () => void
}

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function ChatBox({ isOpen, onClose }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [matchedProperties, setMatchedProperties] = useState<ReturnType<typeof filterProperties>>([])
  const [isTyping, setIsTyping] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [isVoiceActive, setIsVoiceActive] = useState(false)
  const [showMarketTrends, setShowMarketTrends] = useState(false)

  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, matchedProperties, isTyping, showMarketTrends])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleVoiceInput = () => {
    setIsVoiceActive(true)

    // Simulate voice recognition
    setTimeout(() => {
      setIsVoiceActive(false)
      setInputValue("Show me 2BHK apartments in South Delhi")
    }, 3000)
  }

  const sendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)
    setShowMarketTrends(false)

    // Check for market trends query
    const isMarketQuery =
      inputValue.toLowerCase().includes("market") ||
      inputValue.toLowerCase().includes("trend") ||
      inputValue.toLowerCase().includes("forecast") ||
      inputValue.toLowerCase().includes("price")

    // Filter properties based on user query
    const filtered = filterProperties(userMessage.content)

    // Simulate typing delay
    setTimeout(() => {
      let responseContent = ""

      if (isMarketQuery) {
        responseContent =
          "Here are the latest market trends for Delhi NCR. Prices have increased by 8.2% year-over-year, with South Delhi showing the strongest growth at 12.3%. The forecast indicates continued appreciation over the next 6 months."
        setShowMarketTrends(true)
      } else if (filtered.length === 0) {
        responseContent =
          "I couldn't find any properties matching your criteria. Could you try a different search or be more specific?"
      } else {
        responseContent = `I found ${filtered.length} properties that match your criteria:`
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setMatchedProperties(filtered)
      setIsTyping(false)
    }, 1500)
  }

  const chatVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      transition: { duration: 0.2 },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={chatVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-24 right-6 md:bottom-6 md:right-6 w-[90vw] md:w-[450px] h-[70vh] bg-white rounded-3xl shadow-xl overflow-hidden z-50"
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-semibold">Chat with Ayra</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-8 w-8">
              <X size={18} />
            </Button>
          </div>

          <div ref={chatContainerRef} className="p-4 h-[calc(70vh-120px)] overflow-y-auto flex flex-col">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <Image src="/chat-illustration.png" alt="Chat" width={120} height={120} className="mb-4" />
                <h3 className="font-semibold text-lg mb-2">How can I help you today?</h3>
                <p className="text-sm max-w-md">
                  Ask me about properties in Delhi, like "Show me 2BHK apartments" or "Properties under 1 Cr in South
                  Delhi"
                </p>
                <div className="grid grid-cols-1 gap-2 mt-6 w-full max-w-lg">
                  <Button
                    variant="outline"
                    className="rounded-lg justify-start text-left p-3 h-auto"
                    onClick={() => {
                      setInputValue("Show me 2BHK apartments in Delhi")
                      sendMessage()
                    }}
                  >
                    <Home size={16} className="mr-2 flex-shrink-0" />
                    <span>Show me 2BHK apartments in Delhi</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-lg justify-start text-left p-3 h-auto"
                    onClick={() => {
                      setInputValue("What are the market trends for Delhi?")
                      sendMessage()
                    }}
                  >
                    <TrendingUp size={16} className="mr-2 flex-shrink-0" />
                    <span>Market trends in Delhi</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-lg justify-start text-left p-3 h-auto"
                    onClick={() => {
                      setInputValue("Help me calculate my home loan EMI")
                      sendMessage()
                    }}
                  >
                    <Calculator size={16} className="mr-2 flex-shrink-0" />
                    <span>Calculate home loan EMI</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-lg justify-start text-left p-3 h-auto"
                    onClick={() => {
                      setInputValue("Properties near metro stations")
                      sendMessage()
                    }}
                  >
                    <MapPin size={16} className="mr-2 flex-shrink-0" />
                    <span>Properties near metro stations</span>
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <ChatMessage key={message.id} message={message} delay={index * 0.1} />
                ))}

                {showMarketTrends && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="my-4"
                  >
                    <MarketTrendsMini />
                  </motion.div>
                )}

                {matchedProperties.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="grid grid-cols-1 gap-4 my-4"
                  >
                    {matchedProperties.map((property, index) => (
                      <PropertyCard key={property.id} property={property} compact={true} delay={index * 0.1} />
                    ))}
                  </motion.div>
                )}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-gray-500 text-sm"
                  >
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                    <span>Ayra is typing...</span>
                  </motion.div>
                )}
              </>
            )}
          </div>

          <div className="p-4 border-t">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="w-full rounded-full border border-gray-300 py-3 px-4 pr-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute right-2 flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-9 w-9 text-gray-500 hover:text-gray-700"
                  onClick={handleVoiceInput}
                >
                  {isVoiceActive ? <VoiceWaveform /> : <Mic size={18} />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-9 w-9 text-gray-500 hover:text-gray-700"
                  onClick={sendMessage}
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
