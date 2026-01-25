// deno-lint-ignore-file no-import-prefix
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

serve(async (req) => {
  try {
    const payload = await req.json();

    console.log("Received payload:", JSON.stringify(payload, null, 2));

    const data = payload.data || payload;
    const emailId = data.email_id;

    if (!emailId) {
      throw new Error("No email_id found in payload");
    }

    console.log("Fetching email content for ID:", emailId);

    // Fetch the full email content using the CORRECT Resend receiving API endpoint
    const resendResponse = await fetch(
      `https://api.resend.com/emails/receiving/${emailId}`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error("Resend API error:", errorText);
      throw new Error(`Failed to fetch email from Resend: ${errorText}`);
    }

    const emailData = await resendResponse.json();
    console.log("Email data from Resend:", JSON.stringify(emailData, null, 2));

    // Extract email content
    const html = emailData.html || "";
    const text = emailData.text || "";

    // Fallback: if no text, strip HTML tags
    let bodyText = text;
    if (!bodyText && html) {
      bodyText = html.replace(/<[^>]*>?/gm, " ").replace(/\s+/g, " ").trim();
    }

    // Extract sender (handle both string and object formats)
    const sender = emailData.from || data.from || "(Unknown Sender)";
    const subject = emailData.subject || data.subject || "(No Subject)";

    console.log("Inserting email:", {
      sender,
      subject,
      hasHtml: !!html,
      hasText: !!bodyText,
      textLength: bodyText.length,
    });

    const { error: dbError } = await supabase
      .from("inbox_messages")
      .insert({
        sender: sender,
        subject: subject,
        body_text: bodyText || "(No content)",
        body_html: html || bodyText,
      });

    if (dbError) {
      console.error("Database error:", dbError);
      throw dbError;
    }

    console.log("Email saved successfully!");

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Inbound Error:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
