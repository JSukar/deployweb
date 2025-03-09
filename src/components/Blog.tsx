'use client'

import { motion } from 'framer-motion'
import BlogPost, { BlogPost as BlogPostType } from './BlogPost'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import BlogNavbar from './BlogNavbar'

const POSTS_PER_PAGE = 6

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()
  
  const posts: BlogPostType[] = [
    {
      id: '1',
      title: 'The Future of AI in Business Software: Transforming Enterprise Operations',
      excerpt: 'Discover how artificial intelligence is revolutionizing business software and transforming enterprise operations. Learn about key implementation strategies, emerging trends, and best practices for AI integration.',
      date: 'March 10, 2024',
      author: 'John Smith',
      tags: ['AI', 'Business Software', 'Digital Transformation', 'Enterprise Technology'],
      image: 'https://toptalentskills.com/wp-content/uploads/2024/05/1663520031829.jpeg'
    },
    {
      id: '2',
      title: 'Cloud Architecture: Building Scalable and Resilient Solutions for Modern Enterprises',
      excerpt: 'Master the fundamentals of cloud architecture and learn how to build scalable, resilient solutions. Explore best practices, implementation strategies, and emerging trends in cloud computing.',
      date: 'March 8, 2024',
      author: 'Sarah Johnson',
      tags: ['Cloud Computing', 'Architecture', 'DevOps', 'Enterprise Infrastructure'],
      image: 'https://cdn.prod.website-files.com/6596c410e822459a2067a060/663ac8ec8849e047a8909ea7_269jW1nFBAnpEucuKgU_ECP7WqdA8ZjQA02KlmB1i60jMKq-Iw99t0fC-PzLeCTp6fqIJ28IaxwoImK3jBqnFwD-n1AmYz_5Rgee1GJrDWs0SFsSWieh7-_2IOQeyKQSrJ3JbjvDamhOWxcIu2JMad0.jpeg'
    },
    {
      id: '3',
      title: 'Next.js Development: Building Modern Web Applications with React',
      excerpt: 'Learn how to build modern web applications with Next.js. Explore key features, best practices, and advanced development techniques for creating high-performance React applications.',
      date: 'March 5, 2024',
      author: 'David Chen',
      tags: ['Next.js', 'React', 'Web Development', 'JavaScript'],
      image: 'https://mobisoftinfotech.com/resources/wp-content/uploads/2022/04/next-JS-framework.png'
    }
  ]

  const handlePostClick = (id: string) => {
    router.push(`/blog/${id}`)
  }

  return (
    <div className="min-h-screen bg-black">
      <BlogNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => handlePostClick(post.id)}
              className="cursor-pointer"
            >
              <BlogPost {...post} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
} 