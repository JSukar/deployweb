'use client'

import Spline from '@splinetool/react-spline'
import { useState, useEffect, useRef } from 'react'
import type { Application } from '@splinetool/runtime'

interface SceneProps {
  onInteraction?: () => void;
}

export default function Scene({ onInteraction }: SceneProps) {
  const [splineApp, setSplineApp] = useState<Application | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    let animationFrame: number
    let startTime: number | null = null

    const animate = (timestamp: number) => {
      if (!splineApp || hasAnimated.current) return
      if (!startTime) startTime = timestamp

      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / 2000, 1) // 2 seconds animation

      try {
        const parent = splineApp.findObjectByName('Parent')
        const group2 = splineApp.findObjectByName('Group 2')
        const group3 = splineApp.findObjectByName('Group 3')

        // Move elements to their final positions
        if (parent) {
          const targetZ = -2000
          const targetY = 500
          parent.position.z = progress === 1 ? targetZ : progress * targetZ
          parent.position.y = progress === 1 ? targetY : progress * targetY
        }

        if (group2) {
          const targetX = -1500
          const targetZ = -1500
          group2.position.x = progress === 1 ? targetX : progress * targetX
          group2.position.z = progress === 1 ? targetZ : progress * targetZ
        }

        if (group3) {
          const targetX = 1500
          const targetZ = -1500
          group3.position.x = progress === 1 ? targetX : progress * targetX
          group3.position.z = progress === 1 ? targetZ : progress * targetZ
        }

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        } else {
          hasAnimated.current = true
          onInteraction?.()
        }
      } catch (err) {
        console.error('Error during animation:', err)
        setError('Error animating scene')
      }
    }

    const disableInteractions = (app: Application) => {
      const allObjects = [
        app.findObjectByName('Parent'),
        app.findObjectByName('Group 2'),
        app.findObjectByName('Group 3')
      ]

      allObjects.forEach(obj => {
        if (obj) {
          // Disable any available interaction methods
          if ('events' in obj) {
            Object.assign(obj, { events: { enabled: false } })
          }
        }
      })
    }

    if (splineApp && !error) {
      disableInteractions(splineApp)
      
      // Start animation after a short delay
      setTimeout(() => {
        animationFrame = requestAnimationFrame(animate)
      }, 1000)
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [splineApp, onInteraction, error])

  const handleLoad = (app: Application) => {
    console.log('Scene loaded successfully')
    setSplineApp(app)
    setIsLoading(false)
    setError(null)
  }

  const handleError = () => {
    console.error('Error loading scene')
    setError('Failed to load 3D scene')
    setIsLoading(false)
  }

  return (
    <div className="fixed inset-0 pointer-events-none">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center text-white text-lg">
          Loading Scene...
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-red-400 text-lg">
          {error}
        </div>
      )}
      <Spline 
        onLoad={handleLoad}
        onError={handleError}
        style={{
          width: '100%',
          height: '100%',
          touchAction: 'none'
        }}
        scene="/3d/hello_distorting_intro.spline"
      />
    </div>
  )
} 