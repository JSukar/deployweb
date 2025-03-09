import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

// This is the hashed version of 'YourSecurePassword123!@#'
const HASHED_PASSWORD = '$2b$10$caJIg1IjRt2Kg13N1GsqMO2aASskcIdbCXMvmnTW8ws/zvLYl6H3u'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    const isValid = await bcrypt.compare(password, HASHED_PASSWORD)

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    // In a real application, you would:
    // 1. Generate a JWT token
    // 2. Set secure HTTP-only cookies
    // 3. Implement proper session management
    
    return NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 