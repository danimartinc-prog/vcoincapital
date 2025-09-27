import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ProjectSubmissionRequest {
  companyName: string;
  website: string;
  founded: string;
  location: string;
  projectName: string;
  oneLinePitch: string;
  problemSolution: string;
  targetMarket: string;
  businessModel: string;
  fundingAmount: string;
  useOfFunds: string;
  revenue: string;
  projectedRevenue: string;
  founderBackground: string;
  teamSize: string;
  keyTeamMembers: string;
  currentTraction: string;
  customers: string;
  partnerships: string;
  competition: string;
  competitiveAdvantage: string;
  goToMarketStrategy: string;
  founderName: string;
  email: string;
  linkedin: string;
  phone: string;
  files: Array<{name: string, size: number}>;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const submissionData: ProjectSubmissionRequest = await req.json();

    console.log("Sending project submission email for:", submissionData.companyName);

    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
          <h1 style="margin: 0; font-size: 28px;">Nueva Propuesta de Proyecto</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">VCoin Capital - Formulario de Presentación</p>
        </div>

        <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
          <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">📊 Información de la Empresa</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 180px;">Nombre de la empresa:</td><td style="padding: 8px 0;">${submissionData.companyName}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Sitio web:</td><td style="padding: 8px 0;">${submissionData.website || 'No proporcionado'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Fundada:</td><td style="padding: 8px 0;">${submissionData.founded || 'No proporcionado'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Ubicación:</td><td style="padding: 8px 0;">${submissionData.location || 'No proporcionado'}</td></tr>
          </table>
        </div>

        <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
          <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">🚀 Detalles del Proyecto</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 180px;">Nombre del proyecto:</td><td style="padding: 8px 0;">${submissionData.projectName}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Pitch en una línea:</td><td style="padding: 8px 0;">${submissionData.oneLinePitch}</td></tr>
          </table>
          <div style="margin-top: 15px;">
            <strong>Problema y Solución:</strong>
            <div style="background: white; padding: 15px; margin-top: 8px; border-radius: 5px; border-left: 4px solid #667eea;">
              ${submissionData.problemSolution || 'No proporcionado'}
            </div>
          </div>
          <div style="margin-top: 15px;">
            <strong>Mercado Objetivo:</strong>
            <div style="background: white; padding: 15px; margin-top: 8px; border-radius: 5px; border-left: 4px solid #667eea;">
              ${submissionData.targetMarket || 'No proporcionado'}
            </div>
          </div>
          <div style="margin-top: 15px;">
            <strong>Modelo de Negocio:</strong>
            <div style="background: white; padding: 15px; margin-top: 8px; border-radius: 5px; border-left: 4px solid #667eea;">
              ${submissionData.businessModel || 'No proporcionado'}
            </div>
          </div>
        </div>

        <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
          <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">💰 Información Financiera</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 180px;">Financiación requerida:</td><td style="padding: 8px 0;">${submissionData.fundingAmount || 'No especificado'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Ingresos actuales:</td><td style="padding: 8px 0;">${submissionData.revenue || 'No proporcionado'}</td></tr>
          </table>
          <div style="margin-top: 15px;">
            <strong>Uso de Fondos:</strong>
            <div style="background: white; padding: 15px; margin-top: 8px; border-radius: 5px; border-left: 4px solid #667eea;">
              ${submissionData.useOfFunds || 'No proporcionado'}
            </div>
          </div>
        </div>

        <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
          <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">👥 Equipo</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 180px;">Tamaño del equipo:</td><td style="padding: 8px 0;">${submissionData.teamSize || 'No especificado'}</td></tr>
          </table>
          <div style="margin-top: 15px;">
            <strong>Experiencia del Fundador:</strong>
            <div style="background: white; padding: 15px; margin-top: 8px; border-radius: 5px; border-left: 4px solid #667eea;">
              ${submissionData.founderBackground || 'No proporcionado'}
            </div>
          </div>
          <div style="margin-top: 15px;">
            <strong>Miembros Clave del Equipo:</strong>
            <div style="background: white; padding: 15px; margin-top: 8px; border-radius: 5px; border-left: 4px solid #667eea;">
              ${submissionData.keyTeamMembers || 'No proporcionado'}
            </div>
          </div>
        </div>

        <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
          <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">📈 Tracción y Progreso</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 180px;">Clientes actuales:</td><td style="padding: 8px 0;">${submissionData.customers || 'No proporcionado'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Partnerships clave:</td><td style="padding: 8px 0;">${submissionData.partnerships || 'No proporcionado'}</td></tr>
          </table>
          <div style="margin-top: 15px;">
            <strong>Tracción Actual:</strong>
            <div style="background: white; padding: 15px; margin-top: 8px; border-radius: 5px; border-left: 4px solid #667eea;">
              ${submissionData.currentTraction || 'No proporcionado'}
            </div>
          </div>
        </div>

        <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
          <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">📞 Información de Contacto</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 180px;">Nombre del fundador:</td><td style="padding: 8px 0;">${submissionData.founderName}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${submissionData.email}" style="color: #667eea;">${submissionData.email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">LinkedIn:</td><td style="padding: 8px 0;">${submissionData.linkedin ? `<a href="${submissionData.linkedin}" style="color: #667eea;">${submissionData.linkedin}</a>` : 'No proporcionado'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Teléfono:</td><td style="padding: 8px 0;">${submissionData.phone || 'No proporcionado'}</td></tr>
          </table>
        </div>

        ${submissionData.files && submissionData.files.length > 0 ? `
        <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
          <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">📎 Documentos Adjuntos</h2>
          <ul style="margin: 0; padding-left: 20px;">
            ${submissionData.files.map(file => `<li style="padding: 5px 0;">${file.name} (${Math.round(file.size / 1024)} KB)</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; text-align: center;">
          <p style="margin: 0; font-size: 14px;">Este email fue generado automáticamente por el sistema de VCoin Capital</p>
          <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.8;">Fecha: ${new Date().toLocaleString('es-ES')}</p>
        </div>
      </div>
    `;

    // Use Resend API directly via fetch
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'VCoin Capital <noreply@resend.dev>',
        to: ['info@vcoincapital.com'],
        subject: `🚀 Nueva Propuesta: ${submissionData.companyName} - ${submissionData.projectName}`,
        html: emailHTML,
      }),
    });

    if (!response.ok) {
      throw new Error(`Resend API error: ${response.statusText}`);
    }

    const emailResponse = await response.json();
    console.log("Project submission email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-project-submission function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);