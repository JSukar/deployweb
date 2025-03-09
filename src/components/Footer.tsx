'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-black/50 backdrop-blur-lg border-t border-white/10 py-8 mt-16 pb-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h3 className="text-xl font-bold text-white">Deploy LTD</h3>
          
          <a 
            href="mailto:info@deploy.ltd"
            className="text-gray-400 hover:text-blue-400 transition-colors"
          >
            Contact: info@deploy.ltd
          </a>
          
          <p className="text-gray-500 text-sm">
            Copyright © 2025
          </p>
        </div>
      </div>
    </motion.footer>
  )
} 