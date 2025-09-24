import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Create Supabase client with service role key for admin operations
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    const { action, wallet_address } = await req.json();

    if (!wallet_address) {
      throw new Error("Wallet address is required");
    }

    let result;

    switch (action) {
      case 'check_admin':
        // Check if wallet has admin privileges
        const { data: isAdmin, error: checkError } = await supabaseClient.rpc('is_wallet_admin', {
          wallet_address
        });
        
        if (checkError) throw checkError;
        result = { isAdmin: isAdmin || false };
        break;

      case 'assign_admin':
        // Assign admin role to wallet
        const { error: assignError } = await supabaseClient.rpc('assign_wallet_admin', {
          wallet_address
        });
        
        if (assignError) throw assignError;
        result = { success: true, message: 'Admin role assigned successfully' };
        break;

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error: any) {
    console.error('Wallet admin function error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Internal server error' 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});