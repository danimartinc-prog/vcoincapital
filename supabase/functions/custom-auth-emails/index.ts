import React from 'https://esm.sh/react@18.3.1'
import { Webhook } from 'https://esm.sh/standardwebhooks@1.0.0'
import { Resend } from 'https://esm.sh/resend@4.0.0'
import { renderAsync } from 'https://esm.sh/@react-email/components@0.0.22'
import { ConfirmationEmail } from './_templates/confirmation-email.tsx'
import { ResetPasswordEmail } from './_templates/reset-password-email.tsx'

const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string)
const hookSecret = Deno.env.get('SEND_EMAIL_HOOK_SECRET') as string

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405,
      headers: corsHeaders 
    })
  }

  try {
    const payload = await req.text()
    const headers = Object.fromEntries(req.headers)
    
    console.log('Received webhook payload:', { headers: Object.keys(headers) })

    // If no hook secret is set, skip verification (for testing)
    let webhookData: any
    if (hookSecret) {
      const wh = new Webhook(hookSecret)
      webhookData = wh.verify(payload, headers)
    } else {
      webhookData = JSON.parse(payload)
      console.log('Warning: No hook secret set, skipping verification')
    }

    const {
      user,
      email_data: { 
        token, 
        token_hash, 
        redirect_to, 
        email_action_type,
        site_url 
      },
    } = webhookData as {
      user: {
        email: string
      }
      email_data: {
        token: string
        token_hash: string
        redirect_to: string
        email_action_type: string
        site_url: string
      }
    }

    // Fix redirect URL if it's pointing to localhost
    let fixedRedirectTo = redirect_to
    if (redirect_to && redirect_to.includes('localhost:3000')) {
      fixedRedirectTo = site_url || Deno.env.get('SUPABASE_URL') || ''
    }

    console.log('Processing email for user:', user.email, 'type:', email_action_type)

    let html: string
    let subject: string

    // Choose template based on email action type
    switch (email_action_type) {
      case 'signup':
      case 'email_confirmation':
        html = await renderAsync(
          React.createElement(ConfirmationEmail, {
            supabase_url: site_url || Deno.env.get('SUPABASE_URL') || '',
            token,
            token_hash,
            redirect_to: fixedRedirectTo,
            email_action_type,
            user_email: user.email,
          })
        )
        subject = '🚀 Confirma tu cuenta en VCoin Capital'
        break

      case 'recovery':
      case 'reset_password':
        html = await renderAsync(
          React.createElement(ResetPasswordEmail, {
            supabase_url: site_url || Deno.env.get('SUPABASE_URL') || '',
            token,
            token_hash,
            redirect_to: fixedRedirectTo,
            email_action_type,
            user_email: user.email,
          })
        )
        subject = '🔐 Restablece tu contraseña - VCoin Capital'
        break

      default:
        throw new Error(`Email action type not supported: ${email_action_type}`)
    }

    console.log('Sending email with subject:', subject)

    const emailResponse = await resend.emails.send({
      from: 'VCoin Capital <info@vcoincapital.com>',
      to: [user.email],
      subject,
      html,
    })

    if (emailResponse.error) {
      console.error('Resend error:', emailResponse.error)
      throw emailResponse.error
    }

    console.log('Email sent successfully:', emailResponse.data?.id)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully',
        email_id: emailResponse.data?.id 
      }),
      {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        },
      }
    )

  } catch (error: any) {
    console.error('Error in custom-auth-emails function:', error)
    
    return new Response(
      JSON.stringify({
        error: {
          message: error.message || 'Internal server error',
          details: error.toString(),
        },
      }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        },
      }
    )
  }
})