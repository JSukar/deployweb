'use client'

import { motion } from 'framer-motion'

export interface BlogPost {
  id: string;
  title: string;
  content?: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  image: string;
}

interface BlogPostProps extends BlogPost {}

export default function BlogPost({ title, excerpt, date, author, tags = [], image }: BlogPostProps) {
  return (
    <motion.article 
      className="bg-black/30 border border-white/10 rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform"
    >
      <div className="aspect-[16/9] relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-4 text-gray-400 text-sm">
          <span>{date}</span>
          <span>•</span>
          <span>{author}</span>
        </div>

        <h3 className="text-xl font-bold text-white line-clamp-2">
          {title}
        </h3>

        <p className="text-gray-400 line-clamp-3">
          {excerpt}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map(tag => (
            <span 
              key={tag}
              className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
} 