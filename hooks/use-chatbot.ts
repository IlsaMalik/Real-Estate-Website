"use client"

import { useState } from "react"
import { type Property, properties } from "@/data/properties"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

type ChatbotResult = {
  messages: Message[]
  matchedProperties: Property[]
  isTyping: boolean
  inputValue: string
  setInputValue: (value: string) => void
  sendMessage: () => void
  clearChat: () => void
}

export function useChatbot(): ChatbotResult {
  const [messages, setMessages] = useState<Message[]>([])
  const [matchedProperties, setMatchedProperties] = useState<Property[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [inputValue, setInputValue] = useState("")

  // Function to filter properties based on user query
  const filterProperties = (query: string): Property[] => {
    const lowercaseQuery = query.toLowerCase()

    // Check for BHK mentions
    const bhkMatch = lowercaseQuery.match(/(\d+)\s*bhk/i)
    const bedrooms = bhkMatch ? Number.parseInt(bhkMatch[1]) : null

    // Check for location mentions
    const locations = [
      "south delhi",
      "north delhi",
      "east delhi",
      "west delhi",
      "vasant kunj",
      "dwarka",
      "greater kailash",
      "rohini",
      "saket",
      "mayur vihar",
    ]
    const locationMatches = locations.filter((loc) => lowercaseQuery.includes(loc))

    // Check for price mentions
    const underPrice = lowercaseQuery.includes("under") || lowercaseQuery.includes("less than")
    const priceMatch = lowercaseQuery.match(/(\d+(\.\d+)?)\s*(cr|crore|lakh)/i)
    let maxPrice = null

    if (priceMatch) {
      const amount = Number.parseFloat(priceMatch[1])
      const unit = priceMatch[3].toLowerCase()

      if (unit === "cr" || unit === "crore") {
        maxPrice = amount * 10000000 // Convert crore to rupees
      } else if (unit === "lakh") {
        maxPrice = amount * 100000 // Convert lakh to rupees
      }
    }

    return properties.filter((property) => {
      // Filter by bedrooms if specified
      if (bedrooms !== null && property.bedrooms !== bedrooms) {
        return false
      }

      // Filter by location if specified
      if (locationMatches.length > 0) {
        const propertyLocationLower = property.location.toLowerCase()
        if (!locationMatches.some((loc) => propertyLocationLower.includes(loc))) {
          return false
        }
      }

      // Filter by price if specified
      if (maxPrice !== null && underPrice && property.priceValue > maxPrice) {
        return false
      }

      // If no specific filters or all filters passed
      return true
    })
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

    // Filter properties based on user query
    const filtered = filterProperties(userMessage.content)

    // Simulate typing delay
    setTimeout(() => {
      let responseContent = ""

      if (filtered.length === 0) {
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

  const clearChat = () => {
    setMessages([])
    setMatchedProperties([])
  }

  return {
    messages,
    matchedProperties,
    isTyping,
    inputValue,
    setInputValue,
    sendMessage,
    clearChat,
  }
}
