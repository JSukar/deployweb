'use client'

import Scene from '@/components/Scene'
import MainContent from '@/components/MainContent'
import FloatingNav from '@/components/FloatingNav'
import LoadingScreen from '@/components/LoadingScreen'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

export default function Home() {
  const [showContent, setShowContent] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Start loading sequence
    const timer = setTimeout(() => {
      setIsLoading(false)
      setShowContent(true)
    }, 3000) // 3 seconds loading screen

    return () => clearTimeout(timer)
  }, [])

  const handleSceneInteraction = () => {
    setShowContent(true)
  }

  return (
    <main className="relative">
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      <Scene onInteraction={handleSceneInteraction} />
      <MainContent visible={showContent} />
      <FloatingNav />
    </main>
  )
}
