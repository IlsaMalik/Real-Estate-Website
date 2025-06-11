"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Search, MessageCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { PropertyCard } from "@/components/property-card"
import { MarketTrends } from "@/components/market-trends"
import { useMobile } from "@/hooks/use-mobile"
import { ChatBox } from "@/components/chat-box"
import { properties } from "@/data/properties"
import { Logo } from "@/components/logo"
import { SearchChat } from "@/components/search-chat"
import { SignInModal } from "@/components/sign-in-modal"
import { VoiceAssistant } from "@/components/voice-assistant"
import { NewsFeed } from "@/components/news-feed"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const isMobile = useMobile()

  // Handle scrolling animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#f9f5f0] overflow-x-hidden">
      <header className="flex justify-between items-center p-4 md:p-6 sticky top-0 z-40 bg-[#f9f5f0]">
        <Logo />
        <div className="flex items-center gap-2">
          <VoiceAssistant minimal />
          <Button
            variant="outline"
            className="rounded-full bg-white shadow-sm px-3 md:px-4 py-1 md:py-2 flex items-center gap-2"
            onClick={() => setIsSignInOpen(true)}
          >
            <span>Sign In</span>
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                  fill="white"
                />
                <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="white" />
              </svg>
            </div>
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-4 md:py-8 relative">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="transition-all duration-300">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Let AI guide you home.</h1>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {/* Left Card - AI Demo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#333333] rounded-3xl p-6 flex flex-col items-center"
            >
              <div className="bg-[#f9d94c] rounded-2xl p-4 w-28 md:w-32 h-28 md:h-32 relative mb-4 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full flex justify-center gap-0.5">
                    {[...Array(15)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-[#333333] rounded-full"
                        style={{
                          height: `${Math.sin(i * 0.8) * 20 + 30}%`,
                          opacity: 0.6,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <Image src="/house.png" alt="House" width={80} height={80} className="z-10" />
              </div>

              <h2 className="text-white text-xl font-semibold mb-2">See How RightHome AI Works</h2>
              <p className="text-gray-300 text-center text-sm mb-6">
                Take a quick tour of how Ayra, our AI-powered agent, transforms your home search experience the future
                of real estate.
              </p>

              <VoiceAssistant autoPlay={false} />
            </motion.div>

            {/* Right Column - News and Testimonial */}
            <div className="flex flex-col gap-4 md:gap-6">
              {/* News Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl p-4 flex gap-4"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden flex-shrink-0">
                  <Image
                    src="/city.png"
                    alt="City Skyline"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                    <Search size={12} />
                    <span>AI powered insights</span>
                  </div>
                  <NewsFeed />
                </div>
              </motion.div>

              {/* Testimonial Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl p-4 flex gap-4"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden flex-shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
                    alt="Ram Kishore"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">Ram Kishore</h3>
                      <p className="text-xs text-gray-500">First-time buyer</p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="#000000"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm mt-2 italic">
                    "Ayra made home searching effortless — it felt like she just got me."
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Search Chat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 md:mt-12 relative"
        >
          <SearchChat />
        </motion.div>
      </main>

      {/* Property Listings Section */}
      <section className="py-16 bg-white mt-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: scrollY > 100 ? 1 : 0, y: scrollY > 100 ? 0 : 30 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Featured Properties</h2>
            <p className="text-gray-500 text-center mb-10">Discover our handpicked selection of premium properties</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.slice(0, 6).map((property, index) => (
                <PropertyCard key={property.id} property={property} delay={index * 0.1} />
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Button className="rounded-full flex items-center gap-2">
                View all properties
                <ArrowRight size={16} />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-[#f9f5f0]">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: scrollY > 600 ? 1 : 0, y: scrollY > 600 ? 0 : 30 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Market Trends</h2>
            <p className="text-gray-500 text-center mb-10">Stay updated with the latest real estate market trends</p>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <MarketTrends />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: scrollY > 1000 ? 1 : 0, y: scrollY > 1000 ? 0 : 30 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">What Our Customers Say</h2>
            <p className="text-gray-500 text-center mb-10">Hear from our satisfied customers</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Ram Kishore",
                  role: "First-time buyer",
                  image:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
                  quote: "Ayra made home searching effortless — it felt like she just got me.",
                },
                {
                  name: "Priya Sharma",
                  role: "Property investor",
                  image:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
                  quote: "The AI recommendations were spot on. Found exactly what I was looking for in just days.",
                },
                {
                  name: "Vikram Malhotra",
                  role: "Homeowner",
                  image:
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
                  quote: "The market insights helped me time my sale perfectly. Couldn't be happier with the results.",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-[#f9f5f0] rounded-2xl p-6"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="italic text-gray-700">"{testimonial.quote}"</p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="#000000"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-[#333333] text-white py-12">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Logo variant="light" />
              <p className="text-gray-400 mt-2">Let AI guide you home.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div>
                <h3 className="font-semibold mb-3">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>About Us</li>
                  <li>Careers</li>
                  <li>Contact</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Resources</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>Blog</li>
                  <li>Market Reports</li>
                  <li>Help Center</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Legal</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                  <li>Cookie Policy</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2023 RightHome. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Chat Box */}
      <ChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Chat Button (Fixed) */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full p-3 shadow-lg z-50"
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Sign In Modal */}
      <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />

      {/* Toast notifications */}
      <Toaster />
    </div>
  )
}
