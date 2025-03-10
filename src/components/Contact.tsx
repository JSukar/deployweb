'use client'

import { motion } from 'framer-motion'
import { useState, ChangeEvent } from 'react'

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitForm = async () => {
    if (isSubmitting) return;

    // Client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: 'error',
        message: 'Please fill in all fields'
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      console.log('Attempting to submit form...', formData);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Server response received:', response.status);
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Parsed response data:', data);
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        throw new Error(data?.error || 'Failed to send message');
      }

      if (!data?.success) {
        const errorMsg = data?.error || data?.message || 'Failed to send message';
        console.error('Form submission failed:', errorMsg);
        throw new Error(errorMsg);
      }

      // Clear form and show success message
      setFormData({ name: '', email: '', message: '' });
      setStatus({
        type: 'success',
        message: data.message || 'Thank you! Your message has been sent successfully.'
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to send message'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-300">Let's discuss how we can help transform your business</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          {status.type && (
            <div
              className={`mb-6 p-4 rounded-md ${
                status.type === 'success' ? 'bg-green-50/10 text-green-400' : 'bg-red-50/10 text-red-400'
              }`}
            >
              {status.message}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your name"
                disabled={isSubmitting}
                autoComplete="off"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your@email.com"
                disabled={isSubmitting}
                autoComplete="off"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Tell us about your project"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <button
                type="button"
                onClick={() => submitForm()}
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isSubmitting
                    ? 'bg-blue-400/50 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 