import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'blog-posts.json')

interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  date: string
  author: string
  tags: string[]
  image: string
}

// Ensure the data directory exists
async function ensureDataDir() {
  const dir = path.dirname(DATA_FILE)
  try {
    await fs.access(dir)
  } catch {
    await fs.mkdir(dir, { recursive: true })
  }
}

// Read posts from file
async function readPosts(): Promise<BlogPost[]> {
  try {
    await ensureDataDir()
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

// Write posts to file
async function writePosts(posts: BlogPost[]) {
  await ensureDataDir()
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2))
}

// GET /api/blog/posts
export async function GET() {
  const posts = await readPosts()
  return NextResponse.json(posts)
}

// POST /api/blog/posts
export async function POST(request: Request) {
  try {
    const posts = await readPosts()
    const post: Omit<BlogPost, 'id'> = await request.json()

    // Generate a unique ID
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString()
    }

    posts.push(newPost)
    await writePosts(posts)

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
} 