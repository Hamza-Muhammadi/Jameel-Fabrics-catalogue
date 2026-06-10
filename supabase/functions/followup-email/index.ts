import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

serve(async () => {
  const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  // Orders delivered 3 days ago, followup not yet sent
  const from = new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString();
  const to   = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();

  const { data: orders } = await sb
    .from("online_orders")
    .select("*")
    .eq("status", "delivered")
    .gte("created_at", from)
    .lt("created_at", to)
    .eq("followup_sent", false);

  if (!orders?.length) return new Response("No followups needed");

  for (const order of orders) {
    if (!order.customer_email) continue;

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Jameel Fabrics <noreply@jameelfabrics.com>",
        to: order.customer_email,
        subject: "Aap ka fabric kaisa laga? — Jameel Fabrics",
        html: `
          <h2>Jazakallah ${order.customer_name || ""},</h2>
          <p>Umeed hai aap ka order <strong>#${order.id.slice(-6).toUpperCase()}</strong> mila hoga.</p>
          <p>Aap ka review humein behtar banata hai — 1 minute mein de dain:</p>
          <a href="https://jameel-fabrics-catalogue.vercel.app?review=1"
             style="background:#c9a84c;color:#0a0907;padding:10px 20px;border-radius:6px;text-decoration:none;display:inline-block;margin:10px 0;font-weight:700">
            ⭐ Review Dain
          </a>
          <br/>
          <a href="https://jameel-fabrics-catalogue.vercel.app"
             style="background:#111;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;display:inline-block;margin:4px 0">
            🛍️ Dobara Shop Karo
          </a>
          <p style="color:#9ca3af;font-size:12px;margin-top:20px">Jameel Fabrics — Quality Fabrics</p>
        `,
      }),
    });

    await sb.from("online_orders").update({ followup_sent: true }).eq("id", order.id);
  }

  return new Response(`Followups sent: ${orders.length}`);
});
