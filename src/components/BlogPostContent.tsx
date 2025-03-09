'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BlogPost } from './BlogPost'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'

export default function BlogPostContent({ post }: { post: BlogPost }) {
  // Function to format the content with proper paragraphs and lists
  const formatContent = (content: string) => {
    let currentList: React.ReactElement[] = [];
    let result: React.ReactElement[] = [];
    let key = 0;

    content.split('\n').forEach((line, index) => {
      line = line.trim();
      if (!line) return;

      // Main section heading
      if (line.match(/^[A-Z][\w\s]+:/)) {
        if (currentList.length > 0) {
          result.push(<ul key={`list-${key++}`} className="mb-6">{currentList}</ul>);
          currentList = [];
        }
        result.push(
          <h2 key={`heading-${key++}`} className="text-2xl font-bold text-white mt-12 mb-6">
            {line}
          </h2>
        );
        return;
      }

      // Numbered subsection
      if (/^\d+\./.test(line)) {
        if (currentList.length > 0) {
          result.push(<ul key={`list-${key++}`} className="mb-6">{currentList}</ul>);
          currentList = [];
        }
        result.push(
          <h3 key={`subheading-${key++}`} className="text-xl font-bold text-white mt-8 mb-4">
            {line}
          </h3>
        );
        return;
      }

      // Bullet points
      if (line.startsWith('-')) {
        currentList.push(
          <li key={`item-${key++}`} className="text-gray-300 ml-6 mb-2">
            {line.substring(1).trim()}
          </li>
        );
        return;
      }

      // Regular paragraph
      if (currentList.length > 0) {
        result.push(<ul key={`list-${key++}`} className="mb-6">{currentList}</ul>);
        currentList = [];
      }
      result.push(
        <p key={`para-${key++}`} className="text-gray-300 mb-4">
          {line}
        </p>
      );
    });

    // Add any remaining list items
    if (currentList.length > 0) {
      result.push(<ul key={`list-${key++}`} className="mb-6">{currentList}</ul>);
    }

    return result;
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Back button */}
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors mb-8 group"
        >
          <FiArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to Blog</span>
        </Link>

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
            {formatContent(post.content || '')}
          </div>
        </div>
      </motion.div>
    </article>
  )
} 