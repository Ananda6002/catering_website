import { NextResponse } from "next/server";
import { validateQuote, type QuoteFormData } from "@/lib/validation";

/**
 * Quote enquiry endpoint.
 *
 * Integration point: wire `persistEnquiry` to your email/CRM/DB when the
 * backend is ready (e.g. Resend/Nodemailer → business inbox, or a database
 * table the future admin panel reads).
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // normalise + coerce
  const d = body as Record<string, unknown>;
  const data: QuoteFormData = {
    name: String(d.name ?? "").trim(),
    phone: String(d.phone ?? "").trim(),
    email: String(d.email ?? "").trim(),
    eventType: String(d.eventType ?? "").trim(),
    eventDate: String(d.eventDate ?? "").trim(),
    location: String(d.location ?? "").trim(),
    guests: String(d.guests ?? "").trim(),
    foodPreference: String(d.foodPreference ?? "").trim(),
    services: Array.isArray(d.services) ? d.services.map(String) : [],
    details: String(d.details ?? "").trim(),
  };

  const errors = validateQuote(data);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: "Please correct the highlighted fields.", fields: errors },
      { status: 422 }
    );
  }

  try {
    await persistEnquiry(data);
  } catch {
    // Never leak internals; the client shows a friendly retry message.
    return NextResponse.json(
      { error: "We couldn't record your enquiry just now. Please try again or WhatsApp us." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

/**
 * Placeholder persistence — replace with a real integration:
 *   - send email via Resend / Nodemailer / SES
 *   - insert into a database (enquiries table)
 *   - forward to a CRM webhook
 */
async function persistEnquiry(data: QuoteFormData) {
  // TODO(backend): real implementation. For now we acknowledge after a tick
  // so the flow can be demonstrated end-to-end without a backend.
  console.info("[quote] enquiry received:", {
    name: data.name,
    eventType: data.eventType,
    guests: data.guests,
    date: data.eventDate,
    receivedAt: new Date().toISOString(),
  });
  await new Promise((r) => setTimeout(r, 400));
}
