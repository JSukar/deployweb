'use client'

import { motion } from 'framer-motion'

interface Service {
  title: string;
  description: string;
  icon: string;
}

const services: Service[] = [
  {
    title: 'Custom CRM Solutions',
    description: 'Tailored customer relationship management systems designed to fit your unique business needs.',
    icon: '💼'
  },
  {
    title: 'Business Software',
    description: 'Streamline your operations with custom software solutions built for efficiency and growth.',
    icon: '🚀'
  },
  {
    title: 'Integration Services',
    description: 'Seamlessly connect your existing systems with custom integration solutions.',
    icon: '🔄'
  }
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-black to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-gray-300">Transforming businesses with cutting-edge solutions</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-8 hover:bg-white/10 transition-colors"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 