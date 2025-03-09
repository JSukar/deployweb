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

// Read posts from file
async function readPosts(): Promise<BlogPost[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

// Write posts to file
async function writePosts(posts: BlogPost[]) {
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2))
}

// GET /api/blog/posts/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const posts = await readPosts()
    const post = posts.find((p: BlogPost) => p.id === params.id)

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

// PUT /api/blog/posts/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const posts = await readPosts()
    const updatedPost = await request.json()
    const index = posts.findIndex((p: BlogPost) => p.id === params.id)

    if (index === -1) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    posts[index] = { ...posts[index], ...updatedPost }
    await writePosts(posts)

    return NextResponse.json(posts[index])
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

// DELETE /api/blog/posts/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const posts = await readPosts()
    const index = posts.findIndex((p: BlogPost) => p.id === params.id)

    if (index === -1) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    posts.splice(index, 1)
    await writePosts(posts)

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
} 