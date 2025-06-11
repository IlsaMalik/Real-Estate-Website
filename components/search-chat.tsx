"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, Mic, X, Send, Calendar, Calculator, Home } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { VoiceWaveform } from "./voice-waveform"
import { PropertyCard } from "./property-card"
import { filterProperties } from "@/data/properties"
import { MarketTrendsMini } from "./market-trends-mini"

export function SearchChat() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isChatMode, setIsChatMode] = useState(false)
  const [isVoiceActive, setIsVoiceActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<ReturnType<typeof filterProperties>>([])
  const [isSearching, setIsSearching] = useState(false)
  const [messages, setMessages] = useState<Array<{ type: string; content: string }>>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Handle click outside to collapse search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isExpanded &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !chatContainerRef.current?.contains(event.target as Node)
      ) {
        // Don't collapse if in chat mode
        if (!isChatMode) {
          setIsExpanded(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isExpanded, isChatMode])

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded])

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    setIsChatMode(true)

    // Add user message
    setMessages([...messages, { type: "user", content: searchQuery }])

    // Simulate search delay
    setTimeout(() => {
      const results = filterProperties(searchQuery)
      setSearchResults(results)
      setIsSearching(false)

      // Add AI response
      let responseContent = ""
      if (results.length === 0) {
        responseContent = `I couldn't find any properties matching "${searchQuery}". Would you like to try a different search?`
      } else {
        responseContent = `I found ${results.length} properties matching "${searchQuery}". Here are the results:`
      }

      setMessages((prev) => [...prev, { type: "assistant", content: responseContent }])

      // Show suggestions after results
      setTimeout(() => {
        setShowSuggestions(true)
      }, 1000)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleVoiceInput = () => {
    setIsVoiceActive(true)
    setIsExpanded(true)

    // Simulate voice recognition
    setTimeout(() => {
      setIsVoiceActive(false)
      setSearchQuery("3BHK in South Delhi under 1.5 Cr")
      handleSearch()
    }, 2000)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    setMessages([])
    setIsChatMode(false)
    setShowSuggestions(false)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    handleSearch()
  }

  return (
    <div className="relative z-30">
      <motion.div
        layout
        initial={false}
        animate={{
          height: isExpanded ? (isChatMode ? "auto" : "56px") : "56px",
          width: "100%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`bg-white rounded-3xl shadow-md overflow-hidden ${isChatMode ? "border border-gray-200" : ""}`}
      >
        <motion.div layout className="flex items-center p-2 pl-4">
          <button
            className="p-2"
            onClick={() => {
              if (isExpanded) {
                handleSearch()
              } else {
                setIsExpanded(true)
              }
            }}
          >
            <Search size={20} className="text-gray-500" />
          </button>

          {isExpanded ? (
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for properties, e.g. '3BHK in South Delhi'"
              className="flex-1 py-2 px-3 outline-none text-gray-800 bg-transparent"
            />
          ) : (
            <div
              className="flex-1 py-2 px-3 outline-none text-gray-600 cursor-pointer"
              onClick={() => setIsExpanded(true)}
            >
              Need help? Try "Find a 3BHK under ₹1Cr in Delhi"
            </div>
          )}

          {isExpanded && (
            <>
              {searchQuery && (
                <button className="p-2 text-gray-400 hover:text-gray-600" onClick={clearSearch}>
                  <X size={18} />
                </button>
              )}

              <button
                className="p-2 text-gray-400 hover:text-gray-600"
                onClick={(e) => {
                  e.stopPropagation()
                  handleVoiceInput()
                }}
              >
                {isVoiceActive ? <VoiceWaveform /> : <Mic size={20} />}
              </button>

              {isChatMode && (
                <button
                  className="p-2 text-gray-400 hover:text-gray-600"
                  onClick={() => {
                    setIsChatMode(false)
                    setIsExpanded(false)
                    clearSearch()
                  }}
                >
                  <X size={20} />
                </button>
              )}
            </>
          )}
        </motion.div>

        {/* Chat Interface */}
        <AnimatePresence>
          {isChatMode && (
            <motion.div
              ref={chatContainerRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto", maxHeight: "60vh" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t overflow-y-auto"
              style={{ maxHeight: "60vh" }}
            >
              <div className="p-4 space-y-4">
                {/* Messages */}
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.type === "user"
                          ? "bg-blue-500 text-white rounded-tr-none"
                          : "bg-gray-100 text-gray-800 rounded-tl-none"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Loading indicator */}
                {isSearching && (
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
                    <span>Searching...</span>
                  </motion.div>
                )}

                {/* Search Results */}
                {searchResults.length > 0 && !isSearching && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 gap-4">
                      {searchResults.slice(0, 3).map((property, index) => (
                        <PropertyCard key={property.id} property={property} compact={true} delay={index * 0.1} />
                      ))}
                    </div>

                    {searchResults.length > 3 && (
                      <Button
                        variant="outline"
                        className="w-full text-sm"
                        onClick={() => {
                          // Show more properties logic
                        }}
                      >
                        Show {searchResults.length - 3} more properties
                      </Button>
                    )}
                  </motion.div>
                )}

                {/* Market Trends */}
                {!isSearching && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-4"
                  >
                    <h3 className="text-sm font-medium mb-2">Market Trends for {searchQuery}</h3>
                    <MarketTrendsMini />
                  </motion.div>
                )}

                {/* Suggestions */}
                {showSuggestions && !isSearching && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-4"
                  >
                    <h3 className="text-sm font-medium mb-2">Would you like to:</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full text-xs"
                        onClick={() => handleSuggestionClick("Schedule a property tour")}
                      >
                        <Calendar size={14} className="mr-1" />
                        Schedule a tour
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full text-xs"
                        onClick={() => handleSuggestionClick("Calculate home loan EMI")}
                      >
                        <Calculator size={14} className="mr-1" />
                        Calculate loan EMI
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full text-xs"
                        onClick={() => handleSuggestionClick("Show similar properties")}
                      >
                        <Home size={14} className="mr-1" />
                        Similar properties
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input area for chat mode */}
              <div className="border-t p-3 flex items-center">
                <input
                  type="text"
                  placeholder="Ask a follow-up question..."
                  className="flex-1 bg-transparent outline-none text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={handleSearch}
                  disabled={!searchQuery.trim()}
                >
                  <Send size={16} />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
