import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    console.log('Received contact form submission:', { name, email, message })

    // Validate the input
    if (!name || !email || !message) {
      console.log('Missing required fields:', { name, email, message })
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Log the API key (first few characters)
    const apiKey = process.env.RESEND_API_KEY
    console.log('API Key available:', !!apiKey)
    if (apiKey) {
      console.log('API Key starts with:', apiKey.substring(0, 4))
    }

    // Send email using Resend
    try {
      const result = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'joe@jsukar.com',
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      })
      console.log('Resend API response:', result)
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      throw emailError
    }

    // Return success response
    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process contact form' },
      { status: 500 }
    )
  }
} 