import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Img,
  Button,
  Section,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface ConfirmationEmailProps {
  supabase_url: string
  email_action_type: string
  redirect_to: string
  token_hash: string
  token: string
  user_email: string
}

export const ConfirmationEmail = ({
  token,
  supabase_url,
  email_action_type,
  redirect_to,
  token_hash,
  user_email,
}: ConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Confirma tu cuenta en VCoin Capital</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoSection}>
          <Img
            src="https://vcoin-capital.com/logo.png"
            width="120"
            height="120"
            alt="VCoin Capital"
            style={logo}
          />
        </Section>
        
        <Heading style={h1}>¡Bienvenido a VCoin Capital!</Heading>
        
        <Text style={text}>
          Gracias por registrarte en VCoin Capital. Para completar tu registro y comenzar a invertir en los mejores proyectos cripto, necesitas confirmar tu dirección de email.
        </Text>

        <Section style={buttonSection}>
          <Button
            href={`${supabase_url}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`}
            style={button}
          >
            Confirmar mi cuenta
          </Button>
        </Section>

        <Text style={text}>
          Si el botón no funciona, puedes copiar y pegar este enlace en tu navegador:
        </Text>
        
        <Text style={linkText}>
          {`${supabase_url}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`}
        </Text>

        <Text style={text}>
          O usa este código de confirmación:
        </Text>
        <Text style={code}>{token}</Text>

        <Section style={benefitsSection}>
          <Heading style={h2}>¿Qué puedes hacer en VCoin Capital?</Heading>
          <Text style={text}>• Invertir en proyectos cripto revolucionarios</Text>
          <Text style={text}>• Acceder a presales exclusivas</Text>
          <Text style={text}>• Seguir tus inversiones en tiempo real</Text>
          <Text style={text}>• Conectar con fundadores innovadores</Text>
        </Section>

        <Text style={footer}>
          Si no has creado una cuenta en VCoin Capital, puedes ignorar este email de forma segura.
        </Text>

        <Text style={footerBrand}>
          <Link href="https://vcoin-capital.com" style={link}>
            VCoin Capital
          </Link>
          <br />
          El futuro de las inversiones cripto
        </Text>
      </Container>
    </Body>
  </Html>
)

const main = {
  backgroundColor: '#0a0a0b',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '8px',
  maxWidth: '600px',
}

const logoSection = {
  textAlign: 'center' as const,
  padding: '20px 0',
}

const logo = {
  margin: '0 auto',
  borderRadius: '50%',
}

const h1 = {
  color: '#1a1a1a',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '40px 20px 20px 20px',
  padding: '0',
  textAlign: 'center' as const,
  lineHeight: '1.3',
}

const h2 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '30px 20px 15px 20px',
  padding: '0',
}

const text = {
  color: '#555555',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '16px 20px',
}

const linkText = {
  color: '#007bff',
  fontSize: '14px',
  lineHeight: '1.4',
  margin: '16px 20px',
  wordBreak: 'break-all' as const,
  backgroundColor: '#f8f9fa',
  padding: '12px',
  borderRadius: '4px',
  border: '1px solid #e9ecef',
}

const buttonSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#9b87f5',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 32px',
  border: 'none',
  cursor: 'pointer',
}

const code = {
  display: 'inline-block',
  padding: '16px 20px',
  width: 'calc(100% - 40px)',
  backgroundColor: '#f4f4f4',
  borderRadius: '8px',
  border: '1px solid #ddd',
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  letterSpacing: '2px',
  margin: '16px 20px',
}

const benefitsSection = {
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  margin: '32px 20px',
  padding: '20px',
}

const footer = {
  color: '#666666',
  fontSize: '14px',
  lineHeight: '1.4',
  margin: '32px 20px 16px 20px',
}

const footerBrand = {
  color: '#999999',
  fontSize: '12px',
  lineHeight: '1.4',
  textAlign: 'center' as const,
  margin: '32px 20px',
}

const link = {
  color: '#9b87f5',
  textDecoration: 'none',
}

export default ConfirmationEmail