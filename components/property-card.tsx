"use client"

import Image from "next/image"
import { Bed, Bath, Square, Heart, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion } from "framer-motion"
import type { Property } from "@/data/properties"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PropertyCardProps {
  property: Property
  compact?: boolean
  delay?: number
}

export function PropertyCard({ property, compact = false, delay = 0 }: PropertyCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${
        compact ? "flex flex-col" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 w-full overflow-hidden">
        {!imageLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
        <motion.div animate={{ scale: isHovered ? 1.05 : 1 }} transition={{ duration: 0.3 }} className="h-full w-full">
          <Image
            src={property.image || "/placeholder.svg?height=400&width=600"}
            alt={property.name}
            fill
            className={`object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={delay < 0.3} // Prioritize loading for first visible properties
          />
        </motion.div>
        <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 text-sm font-semibold shadow-sm">
          {property.price}
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation()
            setIsLiked(!isLiked)
          }}
          className="absolute top-3 left-3 bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-shadow"
        >
          <Heart size={16} className={isLiked ? "fill-red-500 text-red-500" : "text-gray-400"} />
        </motion.button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{property.name}</h3>
        <p className="text-gray-500 text-sm mb-2">{property.location}</p>

        {!compact && <p className="text-gray-700 text-sm mb-3 line-clamp-2">{property.description}</p>}

        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Bed size={16} />
            <span>
              {property.bedrooms} {property.bedrooms > 1 ? "Beds" : "Bed"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={16} />
            <span>
              {property.bathrooms} {property.bathrooms > 1 ? "Baths" : "Bath"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Square size={16} />
            <span>{property.area}</span>
          </div>
        </div>

        {!compact && (
          <div className="flex flex-wrap gap-2 mb-4">
            {property.features.slice(0, 3).map((feature, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                {feature}
              </span>
            ))}
            {property.features.length > 3 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full flex items-center gap-1 cursor-help">
                      <Info size={12} />+{property.features.length - 3} more
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      {property.features.slice(3).map((feature, index) => (
                        <p key={index} className="text-xs">
                          {feature}
                        </p>
                      ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )}

        <Button variant="outline" className="w-full rounded-full hover:bg-gray-100 transition-colors">
          View Details
        </Button>
      </div>
    </motion.div>
  )
}
