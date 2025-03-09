'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full top-0 z-50 bg-black/50 backdrop-blur-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold">
              Deploy
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="#services" className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">
                Services
              </Link>
              <Link href="#about" className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
              <Link href="#contact" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
} 