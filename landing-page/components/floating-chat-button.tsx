"use client"

import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FloatingChatButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  if (!isVisible) return null

  return (
    <Button
      size="lg"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 rounded-full w-14 h-14 md:w-16 md:h-16 shadow-2xl bg-purple-600 hover:bg-purple-700 text-white z-50 transition-all hover:scale-110"
      aria-label="Open chat"
    >
      <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
    </Button>
  )
}
