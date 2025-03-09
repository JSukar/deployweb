'use client'

import { motion } from 'framer-motion'
import { FaCode, FaDatabase, FaBrain, FaCloud, FaCubes, FaChartLine } from 'react-icons/fa'
import { useState } from 'react'

const solutions = [
  {
    title: 'AI & ML',
    description: 'Advanced machine learning solutions to automate and enhance your business processes. Implement smart algorithms and AI-powered features to streamline operations.',
    features: ['Neural Networks', 'Predictive Analytics', 'Natural Language Processing'],
    icon: FaBrain,
    position: 'translate-x-[-20rem] translate-y-[-12rem]'
  },
  {
    title: 'Analytics',
    description: 'Transform raw data into actionable insights. Our analytics solutions help you understand customer behavior and optimize business performance.',
    features: ['Real-time Dashboards', 'Custom Reports', 'Performance Metrics'],
    icon: FaChartLine,
    position: 'translate-y-[-14rem]'
  },
  {
    title: 'Cloud',
    description: 'Scalable cloud infrastructure designed for growth. Deploy and manage applications with enterprise-grade security and reliability.',
    features: ['AWS/Azure Integration', 'Auto-scaling', 'Load Balancing'],
    icon: FaCloud,
    position: 'translate-x-[20rem] translate-y-[-12rem]'
  },
  {
    title: 'API',
    description: 'Build and integrate robust APIs that connect your systems seamlessly. Modern architecture with focus on performance and security.',
    features: ['RESTful APIs', 'GraphQL', 'Microservices'],
    icon: FaCode,
    position: 'translate-x-[-20rem] translate-y-[12rem]'
  },
  {
    title: 'Database',
    description: 'Optimize your data storage and management with custom database solutions. Ensure data integrity and fast access at any scale.',
    features: ['Cloud Storage', 'Data Migration', 'Performance Tuning'],
    icon: FaDatabase,
    position: 'translate-y-[14rem]'
  },
  {
    title: '3D/AR',
    description: 'Create immersive 3D and AR experiences that engage users. Perfect for product visualization and interactive applications.',
    features: ['WebGL/Three.js', 'AR Integration', 'Interactive Models'],
    icon: FaCubes,
    position: 'translate-x-[20rem] translate-y-[12rem]'
  }
]

function SolutionCard({ solution }: { solution: typeof solutions[0] }) {
  return (
    <motion.div 
      className="w-full bg-gradient-to-br from-blue-600/10 via-blue-900/10 to-black/30 
                 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-500/50 
                 flex flex-col items-center p-5 transition-all duration-300
                 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:scale-105"
      whileHover={{ y: -5 }}
    >
      <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/5 rounded-xl p-4 mb-4">
        <solution.icon className="w-10 h-10 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
      </div>
      <h3 className="text-white font-semibold text-xl mb-3">
        {solution.title}
      </h3>
      <p className="text-gray-300 text-sm text-center leading-relaxed mb-4">
        {solution.description}
      </p>
      <div className="w-full space-y-2">
        {solution.features.map((feature) => (
          <div key={feature} className="flex items-center text-gray-400 text-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
            {feature}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function MobileSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((current) => (current + 1) % solutions.length)
  }

  const prevSlide = () => {
    setCurrentIndex((current) => (current - 1 + solutions.length) % solutions.length)
  }

  return (
    <div className="relative w-full px-4 py-12">
      <div className="max-w-[18rem] mx-auto">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          <SolutionCard solution={solutions[currentIndex]} />
        </motion.div>

        {/* Navigation dots */}
        <div className="flex justify-center space-x-2 mt-6">
          {solutions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-blue-500 w-4' : 'bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white pointer-events-auto transform -translate-x-2"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white pointer-events-auto transform translate-x-2"
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Solutions() {
  return (
    <div className="relative w-full">
      {/* Desktop layout */}
      <div className="hidden lg:flex relative w-full h-screen items-center justify-center">
        {solutions.map((solution) => (
          <motion.div
            key={solution.title}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`absolute ${solution.position}`}
            style={{ maxWidth: '18rem' }}
          >
            <SolutionCard solution={solution} />
          </motion.div>
        ))}
      </div>

      {/* Mobile layout */}
      <div className="lg:hidden">
        <MobileSlideshow />
      </div>
    </div>
  )
}