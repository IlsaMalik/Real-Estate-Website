"use client"

import { useEffect, useState } from "react"

export function VoiceWaveform() {
  const [heights, setHeights] = useState<number[]>([])

  useEffect(() => {
    // Generate initial random heights
    setHeights(Array.from({ length: 5 }, () => Math.random() * 12 + 4))

    // Animate the waveform
    const interval = setInterval(() => {
      setHeights((prev) => prev.map(() => Math.random() * 12 + 4))
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-[2px] h-5">
      {heights.map((height, index) => (
        <div key={index} className="w-[3px] bg-blue-500 rounded-full" style={{ height: `${height}px` }} />
      ))}
    </div>
  )
}
