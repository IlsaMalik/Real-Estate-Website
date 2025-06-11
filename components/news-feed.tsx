"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

interface NewsItem {
  id: string
  title: string
  summary: string
  source: string
  date: string
  url: string
}

const dummyNews: NewsItem[] = [
  {
    id: "news1",
    title: "DLF's $4 Billion Luxury Project Near Delhi Records Unprecedented Sales",
    summary:
      "DLF Ltd. has reported record-breaking sales for its latest luxury residential project in Gurugram, with over 75% of units sold within the first week of launch.",
    source: "Economic Times",
    date: "2023-04-15",
    url: "#",
  },
  {
    id: "news2",
    title: "Delhi NCR Sees 15% Growth in Residential Property Prices",
    summary:
      "The residential real estate market in Delhi NCR has witnessed a significant 15% year-on-year growth in property prices, driven by increased demand and limited supply.",
    source: "Housing.com",
    date: "2023-04-10",
    url: "#",
  },
  {
    id: "news3",
    title: "Government Announces New Housing Scheme for Middle-Income Groups",
    summary:
      "The Indian government has launched a new housing scheme aimed at making home ownership more accessible for middle-income groups in major cities.",
    source: "Moneycontrol",
    date: "2023-04-05",
    url: "#",
  },
  {
    id: "news4",
    title: "Smart Home Technology Adoption Rises Among Delhi Homebuyers",
    summary:
      "A recent survey reveals that over 60% of new homebuyers in Delhi are opting for properties with integrated smart home technologies.",
    source: "Tech Today",
    date: "2023-04-01",
    url: "#",
  },
  {
    id: "news5",
    title: "Foreign Investment in Indian Real Estate Reaches 5-Year High",
    summary:
      "Foreign direct investment in the Indian real estate sector has reached a 5-year high, with Delhi NCR emerging as one of the top destinations.",
    source: "Financial Express",
    date: "2023-03-28",
    url: "#",
  },
]

export function NewsFeed() {
  const [activeNews, setActiveNews] = useState<NewsItem>(dummyNews[0])
  const [newsIndex, setNewsIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setNewsIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % dummyNews.length
        setActiveNews(dummyNews[newIndex])
        return newIndex
      })
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden">
      <motion.div
        key={activeNews.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="font-semibold text-sm md:text-base line-clamp-2">{activeNews.title}</h3>
        <p className="text-xs text-gray-500 mt-1 mb-2 line-clamp-2">{activeNews.summary}</p>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500">{activeNews.source}</span>
          <a
            href={activeNews.url}
            className="text-blue-500 flex items-center gap-1 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more <ExternalLink size={12} />
          </a>
        </div>
      </motion.div>

      <div className="flex justify-center mt-3 gap-1">
        {dummyNews.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${index === newsIndex ? "bg-gray-800 w-4" : "bg-gray-300"}`}
            onClick={() => {
              setNewsIndex(index)
              setActiveNews(dummyNews[index])
            }}
          />
        ))}
      </div>
    </div>
  )
}
