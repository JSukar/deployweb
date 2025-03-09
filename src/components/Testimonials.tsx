'use client'

import { motion } from 'framer-motion'
import { FaQuoteLeft } from 'react-icons/fa'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CTO, TechVision Inc.',
    image: '/testimonials/sarah.jpg',
    quote: 'The AI integration solutions provided by the team have transformed our business operations. The efficiency gains have been remarkable.',
    company: 'TechVision'
  },
  {
    name: 'Michael Chen',
    role: 'Product Director, InnovateLabs',
    image: '/testimonials/michael.jpg',
    quote: 'Their expertise in 3D visualization helped us create an immersive product experience that our customers love. Truly exceptional work.',
    company: 'InnovateLabs'
  },
  {
    name: 'Emma Davis',
    role: 'CEO, DataFlow Systems',
    image: '/testimonials/emma.jpg',
    quote: 'The custom analytics dashboard they built has given us unprecedented insights into our business metrics. A game-changer for our decision-making.',
    company: 'DataFlow'
  }
]

export default function Testimonials() {
  return (
    <div className="relative w-full py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 [text-shadow:_0_2px_10px_rgba(0,0,0,0.3)]">
          Client Testimonials
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
          Hear from our clients about their experience working with us
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-blue-600/10 via-blue-900/10 to-black/30 border border-white/10 backdrop-blur-sm group hover:border-blue-500/50 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <FaQuoteLeft className="text-blue-400 text-3xl mb-6" />
              
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-semibold">
                  {testimonial.name[0]}
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-semibold">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 