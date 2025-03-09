'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We analyze your business needs and current workflows to identify opportunities for improvement.'
  },
  {
    number: '02',
    title: 'Design',
    description: 'Our team creates detailed specifications and intuitive interfaces tailored to your requirements.'
  },
  {
    number: '03',
    title: 'Development',
    description: 'We build your solution using cutting-edge technology and best development practices.'
  },
  {
    number: '04',
    title: 'Deployment',
    description: 'Seamless implementation with comprehensive training and ongoing support.'
  }
]

export default function Process() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-900/20 to-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">How We Work</h2>
          <p className="text-xl text-gray-300">A proven process for delivering excellence</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-600/10 to-transparent p-8 rounded-2xl border border-white/5 h-full">
                <div className="text-5xl font-bold text-blue-500/20 mb-4">{step.number}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[2px] bg-blue-500/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 