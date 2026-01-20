// deno-lint-ignore-file no-import-prefix
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

serve(async (req) => {
    try {
        const payload = await req.json();
        const data = payload.data || payload;

        // STEP 1: Get the ID from the Webhook
        const emailId = data.email_id;
        console.log("Processing Email ID:", emailId);

        // STEP 2: Fetch the full content
        // FIXED: Removed '.receiving' - standard .get() works for inbound emails too
        const { data: emailContent, error: fetchError } = await resend.emails
            .get(emailId);

        if (fetchError || !emailContent) {
            console.error("Fetch Error:", fetchError);
            throw new Error("Could not fetch email content from Resend");
        }

        // STEP 3: Extract & Save
        const html = emailContent.html;
        let text = emailContent.text;

        // Fallback: Create text from HTML if needed
        if (!text && html) {
            text = html.replace(/<[^>]*>?/gm, "");
        }

        const { error: dbError } = await supabase
            .from("inbox_messages")
            .insert({
                sender: emailContent.from.email || emailContent.from, // specific parsing might be needed depending on format
                subject: emailContent.subject,
                body_text: text || "(No content)",
                body_html: html || text,
            });

        if (dbError) throw dbError;

        return new Response(JSON.stringify({ success: true }), {
            headers: { "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : String(error);
        console.error("Inbound Error:", errorMessage);
        return new Response(JSON.stringify({ error: errorMessage }), {
            headers: { "Content-Type": "application/json" },
            status: 500,
        });
    }
});
