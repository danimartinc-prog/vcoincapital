import React from 'https://esm.sh/react@18.3.1'
import { Webhook } from 'https://esm.sh/standardwebhooks@1.0.0'
import { Resend } from 'https://esm.sh/resend@4.0.0'
import { renderAsync } from 'https://esm.sh/@react-email/components@0.0.22'
import { ConfirmationEmail } from './_templates/confirmation-email.tsx'
import { ResetPasswordEmail } from './_templates/reset-password-email.tsx'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.0'
const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string)
const hookSecret = Deno.env.get('SEND_EMAIL_HOOK_SECRET') as string
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') as string,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
)

// Temporarily disable sending emails to avoid consuming credits
const EMAILS_DISABLED = true

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
    const hasSignature = !!headers['webhook-signature']
    if (hookSecret && hasSignature) {
      try {
        const wh = new Webhook(hookSecret)
        webhookData = wh.verify(payload, headers)
      } catch (e: any) {
        console.warn('Signature verification failed, falling back to JSON parse:', e?.message || e)
        webhookData = JSON.parse(payload)
      }
    } else {
      webhookData = JSON.parse(payload)
      if (!hookSecret) console.warn('Warning: No hook secret set, skipping verification')
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
        id: string
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

    // Compute safe redirect target
    let fixedRedirectTo = (redirect_to || '').trim() || site_url
    if (!fixedRedirectTo || fixedRedirectTo.includes('localhost')) {
      fixedRedirectTo = site_url || (Deno.env.get('PUBLIC_SITE_URL') as string) || 'https://vcoincapital.com'
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

    // If emails are disabled, auto-confirm user (for signup) and exit successfully
    if (EMAILS_DISABLED) {
      try {
        if (email_action_type === 'signup' || email_action_type === 'email_confirmation') {
          const userId = (webhookData?.user?.id) as string | undefined
          if (userId) {
            const { data: updated, error: adminErr } = await supabaseAdmin.auth.admin.updateUserById(userId, {
              email_confirm: true,
            })
            if (adminErr) {
              console.error('Admin auto-confirm error:', adminErr)
            } else {
              console.log('User auto-confirmed:', updated?.user?.id)
            }
          } else {
            console.warn('No user id in webhook payload; skipping auto-confirm')
          }
        }
      } catch (e) {
        console.error('Auto-confirm exception:', e)
        // We still return 200 so GoTrue does not send default email nor block signup
      }

      return new Response(
        JSON.stringify({ success: true, message: 'Emails disabled; hook processed', action: email_action_type }),
        { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      )
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