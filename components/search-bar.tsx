"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, Mic, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { VoiceWaveform } from "./voice-waveform"
import { PropertyCard } from "./property-card"
import { filterProperties } from "@/data/properties"

interface SearchBarProps {
  onChatOpen: () => void
}

export function SearchBar({ onChatOpen }: SearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVoiceActive, setIsVoiceActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<ReturnType<typeof filterProperties>>([])
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Handle click outside to collapse search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isExpanded &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isExpanded])

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded])

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)

    // Simulate search delay
    setTimeout(() => {
      const results = filterProperties(searchQuery)
      setSearchResults(results)
      setIsSearching(false)
    }, 500)
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
      setSearchQuery("3BHK in South Delhi")
      handleSearch()
    }, 2000)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="relative z-30">
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "56px" : "56px",
          width: isExpanded ? "100%" : "100%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white rounded-full shadow-md flex items-center p-2 pl-4"
      >
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

        {isExpanded && searchQuery && (
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
      </motion.div>

      {/* Search Results */}
      <AnimatePresence>
        {isExpanded && (searchResults.length > 0 || isSearching) && (
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg p-4 max-h-[70vh] overflow-y-auto"
          >
            {isSearching ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <h3 className="font-semibold">
                    {searchResults.length} {searchResults.length === 1 ? "property" : "properties"} found
                  </h3>
                  <p className="text-sm text-gray-500">for "{searchQuery}"</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {searchResults.map((property, index) => (
                    <PropertyCard key={property.id} property={property} compact={true} delay={index * 0.1} />
                  ))}
                </div>

                {searchResults.length > 0 && (
                  <div className="mt-4 text-center">
                    <Button
                      variant="outline"
                      className="text-sm"
                      onClick={() => {
                        setIsExpanded(false)
                        onChatOpen()
                      }}
                    >
                      Need more help? Chat with Ayra
                    </Button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
