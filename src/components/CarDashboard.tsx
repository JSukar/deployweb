'use client'

import Spline from '@splinetool/react-spline'
import { useState } from 'react'
import type { Application } from '@splinetool/runtime'

export default function CarDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleLoad = (splineApp: Application) => {
    console.log('Car Dashboard loaded successfully')
    setIsLoading(false)
    setError(null)
  }

  const handleError = () => {
    console.error('Error loading Car Dashboard')
    setError('Failed to load 3D scene')
    setIsLoading(false)
  }

  return (
    <div className="relative w-full h-[600px]">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-lg">
          Loading Car Dashboard...
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-red-400 text-lg">
          {error}
        </div>
      )}
      <Spline 
        onLoad={handleLoad}
        onError={handleError}
        style={{
          width: '100%',
          height: '100%',
        }}
        scene="/3d/car_dashboard.spline"
      />
    </div>
  )
} 