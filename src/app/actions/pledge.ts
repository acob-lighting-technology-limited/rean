"use server";

import { Resend } from "resend";
import { formatPledge, intentLabel, pledgeSchema, type PledgeState } from "@/lib/pledge";
import { site } from "@/lib/site";

/**
 * Receives pledges of support and questions.
 * Delivery: email via Resend once RESEND_API_KEY is set, to site.pledgeTo from site.pledgeFrom.
 * Until then the form says online submissions are not live, so nobody believes a message
 * was sent when it wasn't. Every non-success state returns the submitted values, because
 * React resets the form after an action and people must not lose what they typed.
 * TODO(before launch): rate-limit (e.g. Upstash) or Turnstile if spam appears.
 */
export async function submitPledge(_prev: PledgeState, formData: FormData): Promise<PledgeState> {
  const raw = Object.fromEntries([...formData.entries()].filter(([, v]) => typeof v === "string") as [string, string][]);
  const parsed = pledgeSchema.safeParse(raw);

  if (!parsed.success) {
    // A filled honeypot means a bot: answer as if sent, deliver nothing.
    if (raw.website) return { status: "sent", intent: "pledge" };
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      errors[key] ??= issue.message;
    }
    return { status: "invalid", errors, values: raw, at: Date.now() };
  }

  const pledge = parsed.data;
  const { RESEND_API_KEY } = process.env;
  if (!RESEND_API_KEY || !site.pledgeTo || !site.pledgeFrom) return { status: "unconfigured", values: raw, at: Date.now() };

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: site.pledgeFrom,
      to: site.pledgeTo.split(",").map((s) => s.trim()),
      replyTo: pledge.email,
      subject: `${intentLabel[pledge.intent]} · ${pledge.name}${pledge.organisation ? ` · ${pledge.organisation}` : ""}`,
      text: formatPledge(pledge),
    });
    if (error) {
      console.error("[pledge] resend error", error.name);
      return { status: "error", values: raw, at: Date.now() };
    }
    return { status: "sent", intent: pledge.intent };
  } catch (e) {
    console.error("[pledge] send failed", e instanceof Error ? e.message : e);
    return { status: "error", values: raw, at: Date.now() };
  }
}
