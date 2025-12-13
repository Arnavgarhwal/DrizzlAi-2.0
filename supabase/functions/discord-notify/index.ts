import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: "booking" | "inquiry" | "contact";
  data: {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
    consultationType?: string;
    date?: string;
    time?: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const webhookUrl = Deno.env.get("DISCORD_WEBHOOK_URL");
    
    if (!webhookUrl) {
      console.error("DISCORD_WEBHOOK_URL not configured");
      return new Response(
        JSON.stringify({ error: "Discord webhook not configured" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { type, data }: NotificationRequest = await req.json();
    console.log(`Received ${type} notification request:`, data);

    let embed;
    
    if (type === "booking") {
      embed = {
        title: "📅 New Booking Request!",
        color: 0x00D4FF, // Cyan color
        fields: [
          { name: "👤 Name", value: data.name || "Not provided", inline: true },
          { name: "📧 Email", value: data.email || "Not provided", inline: true },
          { name: "📱 Phone", value: data.phone || "Not provided", inline: true },
          { name: "📋 Consultation Type", value: data.consultationType || "Not specified", inline: true },
          { name: "📆 Date", value: data.date || "Not selected", inline: true },
          { name: "⏰ Time", value: data.time || "Not selected", inline: true },
          { name: "💬 Message", value: data.message || "No message", inline: false },
        ],
        timestamp: new Date().toISOString(),
        footer: { text: "DrizzlAi Booking System" },
      };
    } else if (type === "inquiry" || type === "contact") {
      embed = {
        title: type === "inquiry" ? "💼 New Project Inquiry!" : "📬 New Contact Message!",
        color: type === "inquiry" ? 0x9B59B6 : 0x2ECC71,
        fields: [
          { name: "👤 Name", value: data.name || "Not provided", inline: true },
          { name: "📧 Email", value: data.email || "Not provided", inline: true },
          { name: "📱 Phone", value: data.phone || "Not provided", inline: true },
          { name: "💬 Message", value: data.message || "No message", inline: false },
        ],
        timestamp: new Date().toISOString(),
        footer: { text: "DrizzlAi Website" },
      };
    }

    const discordPayload = {
      username: "DrizzlAi Bot",
      avatar_url: "https://i.imgur.com/4M34hi2.png",
      embeds: [embed],
    };

    console.log("Sending to Discord:", JSON.stringify(discordPayload));

    const discordResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload),
    });

    if (!discordResponse.ok) {
      const errorText = await discordResponse.text();
      console.error("Discord API error:", errorText);
      throw new Error(`Discord API error: ${discordResponse.status}`);
    }

    console.log("Discord notification sent successfully");

    return new Response(
      JSON.stringify({ success: true, message: "Notification sent to Discord" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in discord-notify function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
