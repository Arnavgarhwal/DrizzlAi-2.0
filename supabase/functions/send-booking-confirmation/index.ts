import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingConfirmationRequest {
  name: string;
  email: string;
  consultationType: string;
  date: string;
  time: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, consultationType, date, time }: BookingConfirmationRequest = await req.json();

    console.log("Sending booking confirmation to:", email);

    // Format the date for display
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const emailResponse = await resend.emails.send({
      from: "DrizzlAi <onboarding@resend.dev>",
      to: [email],
      subject: "Your Call with DrizzlAi is Confirmed! 🎉",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 40px;">
              <div style="display: inline-block; width: 60px; height: 60px; background: linear-gradient(135deg, #00D4FF, #00A8CC); border-radius: 16px; line-height: 60px; font-size: 28px; font-weight: bold; color: white;">D</div>
              <h1 style="color: #ffffff; font-size: 28px; margin: 20px 0 10px;">Booking Confirmed!</h1>
              <p style="color: #888888; font-size: 16px; margin: 0;">We're excited to connect with you</p>
            </div>

            <!-- Main Content -->
            <div style="background: linear-gradient(145deg, #1a1a1a, #0d0d0d); border: 1px solid #333; border-radius: 16px; padding: 32px; margin-bottom: 24px;">
              <p style="color: #ffffff; font-size: 18px; margin: 0 0 24px;">Hi ${name},</p>
              <p style="color: #cccccc; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                Thank you for scheduling a call with DrizzlAi! We've received your booking and our team is looking forward to speaking with you.
              </p>

              <!-- Booking Details -->
              <div style="background: #0a0a0a; border: 1px solid #333; border-radius: 12px; padding: 24px; margin: 24px 0;">
                <h2 style="color: #00D4FF; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px;">Booking Details</h2>
                
                <div style="margin-bottom: 16px;">
                  <p style="color: #888; font-size: 12px; text-transform: uppercase; margin: 0 0 4px;">Consultation Type</p>
                  <p style="color: #ffffff; font-size: 16px; font-weight: 600; margin: 0;">${consultationType}</p>
                </div>
                
                <div style="margin-bottom: 16px;">
                  <p style="color: #888; font-size: 12px; text-transform: uppercase; margin: 0 0 4px;">Date</p>
                  <p style="color: #ffffff; font-size: 16px; font-weight: 600; margin: 0;">${formattedDate}</p>
                </div>
                
                <div>
                  <p style="color: #888; font-size: 12px; text-transform: uppercase; margin: 0 0 4px;">Time</p>
                  <p style="color: #ffffff; font-size: 16px; font-weight: 600; margin: 0;">${time}</p>
                </div>
              </div>

              <p style="color: #cccccc; font-size: 16px; line-height: 1.6; margin: 24px 0 0;">
                We'll send you a calendar invite with the meeting link shortly. If you have any questions before our call, feel free to reply to this email.
              </p>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding-top: 24px; border-top: 1px solid #333;">
              <p style="color: #666; font-size: 14px; margin: 0 0 8px;">DrizzlAi - Crafting Digital Experiences</p>
              <p style="color: #444; font-size: 12px; margin: 0;">Mumbai, India</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-booking-confirmation function:", error);
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
