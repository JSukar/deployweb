'use client'

import { motion } from 'framer-motion'
import Solutions from './Solutions'
import Process from './Process'
import DnaScene from './DnaScene'
import WorkShowcase from './WorkShowcase'
import Testimonials from './Testimonials'
import Contact from './Contact'
import { useState } from 'react'

interface MainContentProps {
  visible: boolean;
}

export default function MainContent({ visible }: MainContentProps) {
  const [activeSection, setActiveSection] = useState('hero')

  const handleExplore = () => {
    setActiveSection('solutions')
    document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleWork = () => {
    setActiveSection('work')
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleContact = () => {
    setActiveSection('contact')
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Hero Section with blur */}
      <motion.section 
        id="hero" 
        className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 2 }}
      >
        {/* Blur backdrop for hero section only */}
        <motion.div 
          className="absolute inset-0 backdrop-blur-xl bg-black/30 pointer-events-none z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 2, delay: 2 }}
        />

        <div className="relative w-full max-w-7xl mx-auto text-center z-10">
          <div className="relative">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 sm:mb-8 [text-shadow:_0_2px_10px_rgba(0,0,0,0.3)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
              transition={{ duration: 1.5, delay: 2.2 }}
            >
              Deploy
              <span className="block text-blue-400">Your Vision</span>
            </motion.h1>
            
            <motion.p
              className="text-lg sm:text-xl text-gray-200 max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-12 px-4 [text-shadow:_0_1px_5px_rgba(0,0,0,0.2)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
              transition={{ duration: 1.5, delay: 2.4 }}
            >
              Experience the future of business software. Custom solutions that drive growth and efficiency.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
              transition={{ duration: 1.5, delay: 2.6 }}
            >
              <button 
                onClick={handleExplore}
                className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Explore Solutions
              </button>
              <button 
                onClick={handleWork}
                className="w-full sm:w-auto px-8 py-3 border border-white/30 hover:border-white/50 bg-black/20 hover:bg-black/30 text-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                View Our Work
              </button>
              <button 
                onClick={handleContact}
                className="w-full sm:w-auto px-8 py-3 border border-white/30 hover:border-white/50 bg-black/20 hover:bg-black/30 text-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Contact Us
              </button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Solutions Section */}
      <section id="solutions" className="relative w-full min-h-[100vh] bg-black">
        {/* Sticky container for brain animation and content */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
          {/* Brain background */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <DnaScene />
          </div>
          
          {/* Content */}
          <div className="relative z-10 w-full h-full flex flex-col items-center">
            <motion.div
              className="text-center relative z-20 mt-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 [text-shadow:_0_2px_10px_rgba(0,0,0,0.3)]">
                Our Solutions
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Transforming businesses with cutting-edge software solutions
              </p>
            </motion.div>

            {/* Solutions cards */}
            <div className="w-full h-full relative z-20">
              <Solutions />
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="relative w-full min-h-screen bg-black py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 [text-shadow:_0_2px_10px_rgba(0,0,0,0.3)]">
              Our Work
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our interactive 3D projects and creative solutions
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <WorkShowcase />
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative w-full bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Testimonials />
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="relative w-full bg-black pt-0 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Process />
        </div>
      </section>

      {/* Contact Section */}
      <Contact />
    </div>
  )
} 