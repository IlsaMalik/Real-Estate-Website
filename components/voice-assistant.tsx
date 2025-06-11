"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface VoiceAssistantProps {
  autoPlay?: boolean
  minimal?: boolean
}

export function VoiceAssistant({ autoPlay = false, minimal = false }: VoiceAssistantProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const synthRef = useRef<SpeechSynthesis | null>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const welcomeMessage =
    "Welcome to RightHome AI — your AI real estate partner. Search smarter, explore curated listings, track market trends, and let AI guide your perfect home journey."

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis
    }

    if (autoPlay) {
      handlePlay()
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel()
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [autoPlay])

  const handlePlay = () => {
    if (!synthRef.current) return

    // Cancel any ongoing speech
    synthRef.current.cancel()

    // Create new utterance
    utteranceRef.current = new SpeechSynthesisUtterance(welcomeMessage)

    // Configure voice
    utteranceRef.current.rate = 0.9 // Slightly slower for clarity
    utteranceRef.current.pitch = 1

    // Get available voices and set a natural sounding one if available
    const voices = synthRef.current.getVoices()
    const preferredVoice = voices.find(
      (voice) => voice.name.includes("Female") || voice.name.includes("Samantha") || voice.name.includes("Google"),
    )

    if (preferredVoice) {
      utteranceRef.current.voice = preferredVoice
    }

    // Events
    utteranceRef.current.onstart = () => {
      setIsPlaying(true)
      setIsPaused(false)

      // Simulate progress
      let currentProgress = 0
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }

      progressIntervalRef.current = setInterval(
        () => {
          currentProgress += 1
          if (currentProgress > 100) {
            if (progressIntervalRef.current) {
              clearInterval(progressIntervalRef.current)
              progressIntervalRef.current = null
            }
          } else {
            setProgress(currentProgress)
          }
        },
        (welcomeMessage.length * 10) / 100,
      )
    }

    utteranceRef.current.onpause = () => {
      setIsPaused(true)
    }

    utteranceRef.current.onresume = () => {
      setIsPaused(false)
    }

    utteranceRef.current.onend = () => {
      setIsPlaying(false)
      setIsPaused(false)
      setProgress(100)

      // Reset progress after a delay
      setTimeout(() => {
        setProgress(0)
      }, 2000)

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
        progressIntervalRef.current = null
      }
    }

    // Speak
    synthRef.current.speak(utteranceRef.current)
  }

  const handlePause = () => {
    if (!synthRef.current) return

    if (isPlaying && !isPaused) {
      synthRef.current.pause()
      setIsPaused(true)
    } else if (isPlaying && isPaused) {
      synthRef.current.resume()
      setIsPaused(false)
    }
  }

  const handleStop = () => {
    if (!synthRef.current) return

    synthRef.current.cancel()
    setIsPlaying(false)
    setIsPaused(false)
    setProgress(0)

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      progressIntervalRef.current = null
    }
  }

  if (minimal) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full h-10 w-10 relative"
        onClick={isPlaying ? handleStop : handlePlay}
      >
        {isPlaying ? (
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            <Volume2 size={20} className="text-blue-500" />
          </motion.div>
        ) : (
          <Volume2 size={20} />
        )}

        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-blue-500"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1.2, opacity: 0 }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          />
        )}
      </Button>
    )
  }

  return (
    <div className="relative">
      <Button
        onClick={isPlaying ? handlePause : handlePlay}
        className="bg-white text-black hover:bg-gray-100 rounded-full w-full flex items-center justify-center gap-2"
      >
        {isPlaying ? (
          <>
            {isPaused ? <Play size={18} /> : <Pause size={18} />}
            <span>{isPaused ? "Resume" : "Pause"}</span>
            <motion.div
              className="ml-1 flex items-center gap-[2px]"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-[3px] bg-blue-500 rounded-full"
                  initial={{ height: 4 }}
                  animate={{ height: [4, 12, 4] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </>
        ) : (
          <>
            <Play size={18} />
            <span>Play now</span>
          </>
        )}
      </Button>
    </div>
  )
}
