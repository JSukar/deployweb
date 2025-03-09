'use client'

import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import { useState } from 'react'
import type { Application } from '@splinetool/runtime'

export default function DnaScene() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleLoad = (splineApp: Application) => {
    console.log('Brain Scene loaded successfully')
    setIsLoading(false)
    setError(null)
    
    // Disable all interactions
    if (splineApp.canvas) {
      // Make the canvas non-interactive
      splineApp.canvas.style.pointerEvents = 'none';
      
      // Prevent scroll/zoom
      splineApp.canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
      }, { passive: false });
      
      // Prevent touch interactions
      splineApp.canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
      }, { passive: false });
      
      // Prevent mouse interactions
      splineApp.canvas.addEventListener('mousedown', (e) => {
        e.preventDefault();
      }, { passive: false });
    }
  }

  return (
    <motion.div 
      className="relative h-[60vh] w-full overflow-hidden bg-black/5 pointer-events-none"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center text-white text-lg bg-black/20">
          Loading Brain Animation...
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-red-400 text-lg bg-black/20">
          {error}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
      <Spline
        className="transform-gpu pointer-events-none"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: '55%',
          left: '50%',
          transform: 'translate(-48%, -50%) scale(1.2)',
          zIndex: 20,
          touchAction: 'none'
        }}
        onLoad={handleLoad}
        scene="/3d/ai_brain.spline"
      />
    </motion.div>
  )
} 