import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  // Log initial request
  console.log('Contact form API route hit:', new Date().toISOString())

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  try {
    // Log request details
    console.log('Request method:', request.method)
    console.log('Request headers:', Object.fromEntries(request.headers))

    const body = await request.json()
    console.log('Request body:', body)
    
    const { name, email, message } = body

    // Validate the input
    if (!name || !email || !message) {
      console.log('Missing required fields:', { name, email, message })
      return new NextResponse(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    }

    // Log the API key (first few characters)
    const apiKey = process.env.RESEND_API_KEY
    console.log('API Key available:', !!apiKey)
    if (apiKey) {
      console.log('API Key starts with:', apiKey.substring(0, 4))
    } else {
      throw new Error('Resend API key is not configured')
    }

    // Send email using Resend
    try {
      console.log('Attempting to send email via Resend...')
      const result = await resend.emails.send({
        from: 'contact@deploy.ltd',
        to: 'joe@deploy.ltd',
        replyTo: email,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Contact Form Submission</h2>
            <div style="margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 10px 0;"><strong>Message:</strong></p>
              <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 5px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <div style="color: #666; font-size: 12px; margin-top: 20px; padding-top: 10px; border-top: 1px solid #eee;">
              Sent from your website contact form
            </div>
          </div>
        `
      })
      console.log('Resend API response:', result)

      // Check for Resend API errors
      if (result.error) {
        const errorResponse = {
          success: false,
          error: result.error.message,
          message: 'Failed to send message: ' + result.error.message
        };
        console.log('Sending error response:', errorResponse);
        
        return new Response(JSON.stringify(errorResponse), {
          status: 403, // Use 403 for test mode restriction
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      const responseData = {
        success: true,
        message: 'Message sent successfully',
        data: result
      };
      console.log('Sending response:', responseData);

      return new Response(JSON.stringify(responseData), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      throw emailError
    }
  } catch (error) {
    console.error('Error processing contact form:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to process contact form'
    console.error('Error message:', errorMessage)
    
    const errorResponse = {
      success: false,
      error: errorMessage,
      message: 'Failed to send message'
    };
    console.log('Sending error response:', errorResponse);

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
} 