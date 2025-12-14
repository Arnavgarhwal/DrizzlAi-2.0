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
  timezone?: string;
  timezoneOffset?: string;
  durationMinutes?: number;
}

// Generate ICS calendar file content
function generateICS(
  name: string,
  email: string,
  consultationType: string,
  date: string,
  time: string,
  timezone: string,
  timezoneOffset: string,
  durationMinutes: number
): string {
  // Parse date and time
  const [year, month, day] = date.split('-').map(Number);
  
  // Parse time (12-hour format with AM/PM)
  const timeMatch = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  let hours = 0;
  let minutes = 0;
  
  if (timeMatch) {
    hours = parseInt(timeMatch[1]);
    minutes = parseInt(timeMatch[2]);
    const period = timeMatch[3].toUpperCase();
    
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
  }

  // Create start date in the specified timezone
  const startDate = new Date(year, month - 1, day, hours, minutes);
  const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);

  // Format dates for ICS (YYYYMMDDTHHMMSS)
  const formatICSDate = (d: Date): string => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
  };

  const now = new Date();
  const uid = `${now.getTime()}-${Math.random().toString(36).substr(2, 9)}@drizzlai.com`;

  // Get VTIMEZONE identifier
  const tzid = timezone || 'Asia/Kolkata';
  
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//DrizzlAi//Booking System//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${formatICSDate(now)}
DTSTART;TZID=${tzid}:${formatICSDate(startDate)}
DTEND;TZID=${tzid}:${formatICSDate(endDate)}
SUMMARY:DrizzlAi ${consultationType}
DESCRIPTION:Consultation call with DrizzlAi team.\\n\\nBooked by: ${name}\\nEmail: ${email}\\n\\nWe look forward to speaking with you!
LOCATION:Video Call (Link will be sent separately)
ORGANIZER;CN=DrizzlAi:mailto:hello.drizzleai@gmail.com
ATTENDEE;CN=${name};RSVP=TRUE:mailto:${email}
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT30M
ACTION:DISPLAY
DESCRIPTION:Reminder: DrizzlAi ${consultationType} in 30 minutes
END:VALARM
END:VEVENT
END:VCALENDAR`;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      name, 
      email, 
      consultationType, 
      date, 
      time,
      timezone = "Asia/Kolkata",
      timezoneOffset = "+05:30",
      durationMinutes = 30
    }: BookingConfirmationRequest = await req.json();

    console.log("Sending booking confirmation to:", email);

    // Format the date for display
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Get timezone display name
    const timezoneDisplay = timezone.replace('_', ' ').split('/').pop() || timezone;

    // Generate ICS content
    const icsContent = generateICS(
      name,
      email,
      consultationType,
      date,
      time,
      timezone,
      timezoneOffset,
      durationMinutes
    );

    // Convert ICS to base64 for attachment
    const icsBase64 = btoa(icsContent);

    const emailResponse = await resend.emails.send({
      from: "DrizzlAi <onboarding@resend.dev>",
      to: [email],
      subject: "Your Call with DrizzlAi is Confirmed! 🎉",
      attachments: [
        {
          filename: "drizzlai-booking.ics",
          content: icsBase64,
        },
      ],
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
                
                <div style="margin-bottom: 16px;">
                  <p style="color: #888; font-size: 12px; text-transform: uppercase; margin: 0 0 4px;">Time</p>
                  <p style="color: #ffffff; font-size: 16px; font-weight: 600; margin: 0;">${time}</p>
                </div>

                <div>
                  <p style="color: #888; font-size: 12px; text-transform: uppercase; margin: 0 0 4px;">Timezone</p>
                  <p style="color: #ffffff; font-size: 16px; font-weight: 600; margin: 0;">${timezoneDisplay} (UTC${timezoneOffset})</p>
                </div>
              </div>

              <!-- Calendar Notice -->
              <div style="background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 168, 204, 0.1)); border: 1px solid rgba(0, 212, 255, 0.3); border-radius: 12px; padding: 16px; margin: 24px 0;">
                <p style="color: #00D4FF; font-size: 14px; font-weight: 600; margin: 0 0 8px;">📅 Add to Calendar</p>
                <p style="color: #cccccc; font-size: 14px; margin: 0;">We've attached a calendar file (.ics) to this email. Open it to add this meeting to your calendar app.</p>
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
