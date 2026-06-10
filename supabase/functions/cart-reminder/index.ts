import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

serve(async () => {
  const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { data: orders } = await sb
    .from("online_orders")
    .select("*")
    .eq("status", "pending")
    .lt("created_at", cutoff)
    .eq("reminder_sent", false);

  if (!orders?.length) return new Response("No abandoned carts");

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
        subject: "Aap ka order pending hai — Jameel Fabrics",
        html: `
          <h2>Assalam o Alaikum ${order.customer_name || ""},</h2>
          <p>Aap ka order <strong>#${order.id.slice(-6).toUpperCase()}</strong> abhi pending hai.</p>
          <p>Total: <strong>Rs. ${Number(order.total).toLocaleString()}</strong></p>
          <a href="https://wa.me/923228722232?text=Order+confirm+karna+hai"
             style="background:#25D366;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;display:inline-block;margin:10px 0">
            WhatsApp pe Confirm Karo
          </a>
        `,
      }),
    });

    await sb.from("online_orders").update({ reminder_sent: true }).eq("id", order.id);
  }

  return new Response(`Done: ${orders.length}`);
});
