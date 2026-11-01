import { z } from "zod";
import { INTENTS, MEMBERSHIP, intentLabel, membershipLabel } from "./pledge-options";

export { INTENTS, MEMBERSHIP, intentLabel, membershipLabel };

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

export const pledgeSchema = z
  .object({
    intent: z.enum(INTENTS, { message: "Choose whether you’re pledging support or asking a question." }),
    name: z.string().trim().min(2, "Enter your full name.").max(80, "Use 80 characters or fewer."),
    organisation: optionalText(120),
    membership: z.enum(MEMBERSHIP, { message: "Tell us how you’re connected to REAN." }),
    email: z.string().trim().max(120).pipe(z.email("Enter an email address like name@company.com.")),
    phone: z
      .string()
      .trim()
      .transform((v) => v.replace(/[\s()-]/g, ""))
      .pipe(z.string().regex(/^(\+?\d{7,15})?$/, "Enter a phone number like +234 801 234 5678, or leave it blank."))
      .transform((v) => (v ? v : undefined)),
    message: optionalText(1500),
    consent: z.literal("yes", { message: "Tick the box so we can store your details and reply." }),
    // Honeypot: real people never fill this.
    website: z.string().max(0).optional(),
  })
  .refine((d) => d.intent !== "question" || d.message, { message: "Write your question.", path: ["message"] });

export type Pledge = z.infer<typeof pledgeSchema>;

export type PledgeState =
  | { status: "idle" }
  | { status: "invalid"; errors: Partial<Record<string, string>>; values: Record<string, string>; at: number }
  | { status: "sent"; intent: Pledge["intent"] }
  | { status: "unconfigured"; values: Record<string, string>; at: number }
  | { status: "error"; values: Record<string, string>; at: number };

/** Plain-text email body. Plain text avoids HTML injection from form input. */
export function formatPledge(p: Pledge) {
  const rows: [string, string | undefined][] = [
    ["Type", intentLabel[p.intent]],
    ["Name", p.name],
    ["Organisation", p.organisation],
    ["REAN membership", membershipLabel[p.membership]],
    ["Email", p.email],
    ["Phone", p.phone],
    ["Message", p.message],
    ["Consent to store and reply", "Yes"],
  ];
  return rows
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}
