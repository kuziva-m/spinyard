// deno-lint-ignore-file no-import-prefix
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS (allows your React app to call this function)
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Extract data passed from the Frontend
    const { email, message, subject } = await req.json();

    const data = await resend.emails.send({
      from: "Spinyard Admin <info@spinyard.co.zw>", 

      // FIX 1: Use the actual recipient email from your form
      to: email,

      // FIX 2: Use the subject from the form (or a default if missing)
      subject: subject || "New Message from Spinyard Admin",

      // FIX 3: Send the HTML message directly (since EmailManager.jsx formats it)
      html: message,
    });

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    // FIX: Safely extract the error message
    const errorMessage = error instanceof Error ? error.message : String(error);

    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
