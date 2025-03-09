'use client'

import { motion } from 'framer-motion'
import { BlogPost } from '../BlogPost'

export default function BlogPostContent({ post }: { post: BlogPost }) {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-[400px] object-cover rounded-2xl mb-8 shadow-2xl"
        />
        
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.author}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map(tag => (
              <span 
                key={tag}
                className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <p>{post.content}</p>
          </div>
        </div>
      </motion.div>
    </article>
  )
} 