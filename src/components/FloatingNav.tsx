'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'solutions', label: 'Solutions', path: '/#solutions' },
  { id: 'work', label: 'Work', path: '/#work' },
  { id: 'testimonials', label: 'Testimonials', path: '/#testimonials' },
  { id: 'process', label: 'How We Work', path: '/#process' },
  { id: 'contact', label: 'Contact', path: '/#contact' },
  { id: 'blog', label: 'Blog', path: '/blog' }
]

export default function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isBlogPage = pathname?.startsWith('/blog')

  useEffect(() => {
    const handleScroll = () => {
      // Always show nav on blog pages
      if (isBlogPage) {
        setIsVisible(true)
        return
      }

      // Show nav after scrolling down on home page
      if (window.scrollY > window.innerHeight / 2) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isBlogPage])

  // Don't show floating nav on blog pages since we have BlogNavbar
  if (isBlogPage) {
    return null
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-black/80 backdrop-blur-lg border border-white/10 flex items-center justify-center"
      >
        <div className="flex flex-col justify-between h-3.5 w-5">
          <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`w-full h-0.5 bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </div>
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-x-4 bottom-20 z-50 bg-black/90 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden"
          >
            <nav className="py-2">
              {navigation.map(item => (
                <Link
                  key={item.id}
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-6 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 50
        }}
        transition={{ duration: 0.3 }}
        className="hidden lg:block fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
      >
        <div className="bg-black/80 backdrop-blur-lg px-6 py-3 rounded-full border border-white/10">
          <ul className="flex items-center space-x-8">
            {navigation.map(item => (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>
    </>
  )
} 