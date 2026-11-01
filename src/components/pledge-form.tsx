"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { submitPledge } from "@/app/actions/pledge";
import type { PledgeState } from "@/lib/pledge";
import { MEMBERSHIP, membershipLabel } from "@/lib/pledge-options";
import { cn } from "@/ui/lib/cn";
import { buttonClasses } from "@/ui/primitives/button";
import { ShareOnWhatsApp } from "./share";

const fieldBase =
  "mt-2 block w-full rounded-[var(--radius)] border border-line-strong bg-surface px-4 py-3 text-base text-fg placeholder:text-muted/80 transition-[border-color,box-shadow] duration-(--dur) hover:border-fg/40 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[color-mix(in_srgb,var(--focus)_35%,transparent)] aria-invalid:border-danger";

function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="font-semibold">
        {label}
        {hint && <span className="font-normal text-muted"> {hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-[15px] font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Pledge of support or question for Alexander. Server action with zod validation; errors show
 * inline and focus moves to the first invalid field. If email delivery isn't configured,
 * the form says so plainly instead of pretending to send.
 */
export function PledgeForm() {
  const [state, action, pending] = useActionState<PledgeState, FormData>(submitPledge, { status: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const errors = state.status === "invalid" ? state.errors : {};
  const values = "values" in state ? state.values : {};

  useEffect(() => {
    if (state.status === "invalid") formRef.current?.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
    else if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  if (state.status === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-[var(--radius-lg)] border border-line bg-surface p-8">
        <p className="font-display text-3xl font-bold">Thank you.</p>
        <p className="mt-3 text-lg text-muted">
          {state.intent === "pledge" ? "Your pledge has reached the campaign team." : "Your question has reached the campaign team, and they’ll reply by email."} The most useful next step is to pass the plan on to a colleague.
        </p>
        <ShareOnWhatsApp className="mt-6" path="/plan" />
      </div>
    );
  }

  const err = (name: string) =>
    errors[name] ? { "aria-invalid": true as const, "aria-describedby": `${name}-error` } : {};

  return (
    <form ref={formRef} action={action} noValidate className="space-y-6 rounded-[var(--radius-lg)] border border-line bg-surface p-6 sm:p-8">
      <fieldset>
        <legend className="font-semibold">I want to…</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {[
            { value: "pledge", label: "Pledge my support", hint: "Add your name to those backing the plan." },
            { value: "question", label: "Ask Alexander a question", hint: "About the plan, REAN or the election." },
          ].map((o) => (
            <label
              key={o.value}
              className="flex cursor-pointer gap-3 rounded-[var(--radius)] border border-line-strong p-4 transition-colors duration-(--dur) hover:border-fg/40 has-[:checked]:border-accent has-[:checked]:bg-[color-mix(in_srgb,var(--accent)_8%,transparent)] has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-[color-mix(in_srgb,var(--focus)_35%,transparent)]"
            >
              <input type="radio" name="intent" value={o.value} defaultChecked={(values.intent ?? "pledge") === o.value} className="mt-1 size-4 accent-[var(--accent)]" />
              <span>
                <span className="block font-semibold">{o.label}</span>
                <span className="block text-[15px] text-muted">{o.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Full name" error={errors.name}>
          <input id="name" name="name" autoComplete="name" defaultValue={values.name} required className={fieldBase} placeholder="e.g. Ngozi Adeyemi…" {...err("name")} />
        </Field>
        <Field id="organisation" label="Company or organisation" hint="(optional)" error={errors.organisation}>
          <input id="organisation" name="organisation" autoComplete="organization" defaultValue={values.organisation} className={fieldBase} placeholder="e.g. Sunrise Mini-Grids Ltd…" {...err("organisation")} />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            defaultValue={values.email}
            required
            className={fieldBase}
            placeholder="name@company.com…"
            {...err("email")}
          />
        </Field>
        <Field id="phone" label="Phone or WhatsApp" hint="(optional)" error={errors.phone}>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" defaultValue={values.phone} className={fieldBase} placeholder="+234 801 234 5678…" {...err("phone")} />
        </Field>
      </div>

      <Field id="membership" label="Your connection to REAN" error={errors.membership}>
        {/* React's post-action form reset ignores a select's defaultValue, so remount it per submission. */}
        <select key={"at" in state ? state.at : 0} id="membership" name="membership" defaultValue={values.membership ?? ""} required className={cn(fieldBase, "appearance-auto bg-surface text-fg")} {...err("membership")}>
          <option value="" disabled>
            Choose one…
          </option>
          {MEMBERSHIP.map((m) => (
            <option key={m} value={m}>
              {membershipLabel[m]}
            </option>
          ))}
        </select>
      </Field>

      <Field id="message" label="Message or question" hint="(required for questions)" error={errors.message}>
        <textarea id="message" name="message" rows={5} defaultValue={values.message} className={fieldBase} placeholder="What would you like REAN to focus on first?…" {...err("message")} />
      </Field>

      {/* Honeypot, hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex cursor-pointer gap-3">
          <input type="checkbox" name="consent" value="yes" defaultChecked={values.consent === "yes"} className="mt-1 size-5 shrink-0 accent-[var(--accent)]" {...err("consent")} />
          <span className="text-[15px] leading-relaxed">
            The campaign may store these details to count my pledge or reply to my question, as described in the{" "}
            <Link href="/privacy" className="text-accent-text underline underline-offset-4">
              privacy notice
            </Link>
            .
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="mt-2 text-[15px] font-medium text-danger">
            {errors.consent}
          </p>
        )}
      </div>

      <div aria-live="polite" ref={statusRef} tabIndex={-1} className="outline-none">
        {state.status === "unconfigured" && (
          <p className="rounded-[var(--radius)] border border-dashed border-accent-text p-4 text-[15px] text-accent-text">
            We couldn&rsquo;t send your message online just now. Please message Alexander on LinkedIn or share the plan on WhatsApp instead.
          </p>
        )}
        {state.status === "error" && (
          <p className="rounded-[var(--radius)] border border-danger p-4 text-[15px] text-danger">
            Something went wrong and your message wasn&rsquo;t sent. Please try again in a minute.
          </p>
        )}
        {state.status === "invalid" && <p className="sr-only">Some fields need attention. The first one is now focused.</p>}
      </div>

      <button type="submit" className={cn(buttonClasses({ size: "lg" }), "w-full sm:w-auto")} disabled={pending}>
        {pending ? "Sending…" : "Send to the campaign"}
      </button>
    </form>
  );
}
