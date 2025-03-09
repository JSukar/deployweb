'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { BlogPost } from './BlogPost'

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({
    title: '',
    content: '',
    excerpt: '',
    tags: [],
    image: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // This will be replaced with actual API call
    const newPost = {
      id: Date.now().toString(),
      title: currentPost.title || '',
      content: currentPost.content || '',
      excerpt: currentPost.excerpt || '',
      tags: currentPost.tags || [],
      date: new Date().toLocaleDateString(),
      author: 'Admin', // This will come from auth
      image: currentPost.image || '/default-blog-image.jpg'
    }
    
    setPosts([...posts, newPost])
    setCurrentPost({
      title: '',
      content: '',
      excerpt: '',
      tags: [],
      image: ''
    })
  }

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/30 rounded-2xl p-8 border border-white/10 backdrop-blur-sm"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Manage Blog Posts</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={currentPost.title}
                onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Excerpt
              </label>
              <textarea
                value={currentPost.excerpt}
                onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white"
                rows={2}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Content
              </label>
              <textarea
                value={currentPost.content}
                onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white"
                rows={10}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={currentPost.tags?.join(', ')}
                onChange={(e) => setCurrentPost({ 
                  ...currentPost, 
                  tags: e.target.value.split(',').map(tag => tag.trim()) 
                })}
                className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Image URL
              </label>
              <input
                type="text"
                value={currentPost.image}
                onChange={(e) => setCurrentPost({ ...currentPost, image: e.target.value })}
                className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setCurrentPost({
                  title: '',
                  content: '',
                  excerpt: '',
                  tags: [],
                  image: ''
                })}
                className="px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-colors"
              >
                Clear
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                {isEditing ? 'Update Post' : 'Create Post'}
              </button>
            </div>
          </form>

          {/* Posts List */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-white mb-6">Published Posts</h3>
            <div className="space-y-4">
              {posts.map(post => (
                <div 
                  key={post.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <div>
                    <h4 className="text-white font-medium">{post.title}</h4>
                    <p className="text-sm text-gray-400">{post.date}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setCurrentPost(post)
                        setIsEditing(true)
                      }}
                      className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setPosts(posts.filter(p => p.id !== post.id))}
                      className="px-3 py-1 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 