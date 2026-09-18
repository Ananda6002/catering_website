"use client";

import { useState, type FormEvent } from "react";
import { site, whatsappLink } from "@/content/site";
import {
  eventTypeOptions,
  foodPreferenceOptions,
  serviceOptions,
  validateQuote,
  type QuoteFormData,
} from "@/lib/validation";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const initialData: QuoteFormData = {
  name: "",
  phone: "",
  email: "",
  eventType: "",
  eventDate: "",
  location: "",
  guests: "",
  foodPreference: "",
  services: [],
  details: "",
};

const packageNames: Record<string, string> = {
  basic: "The Gathering",
  classic: "The Celebration",
  premium: "The Grand Table",
};

function makeInitialData(prefillPackage?: string, prefillEvent?: string): QuoteFormData {
  const parts: string[] = [];
  if (prefillPackage) {
    parts.push(`Interested in “${packageNames[prefillPackage] ?? prefillPackage}” package.`);
  }
  if (prefillEvent) parts.push(`Occasion: ${prefillEvent}.`);
  return {
    ...initialData,
    details: parts.join(" "),
    eventType: prefillEvent && eventTypeOptions.includes(prefillEvent) ? prefillEvent : "",
  };
}

export function QuoteForm({
  prefillPackage,
  prefillEvent,
}: {
  prefillPackage?: string;
  prefillEvent?: string;
}) {
  const [data, setData] = useState<QuoteFormData>(() =>
    makeInitialData(prefillPackage, prefillEvent)
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string>("");

  const set = <K extends keyof QuoteFormData>(key: K, value: QuoteFormData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  };

  const toggleService = (s: string) => {
    setData((d) => ({
      ...d,
      services: d.services.includes(s)
        ? d.services.filter((x) => x !== s)
        : [...d.services, s],
    }));
    if (errors.services) setErrors((e) => ({ ...e, services: "" }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validateQuote(data);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      // focus first invalid field
      const first = Object.keys(errs)[0];
      const el = document.querySelector<HTMLElement>(`[name="${first}"]`);
      el?.focus();
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus("submitting");
    setServerError("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  /* ---------------- success state ---------------- */
  if (status === "success") {
    return (
      <div className="grain relative bg-espresso p-10 text-cream sm:p-14" role="status">
        <span aria-hidden="true" className="display text-6xl leading-none text-saffron">&ldquo;</span>
        <h3 className="display display-md mt-4 text-cream">
          Consider the table <em className="text-saffron">reserved for talk.</em>
        </h3>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream/70">
          Thank you, {data.name.split(" ")[0]}. Your enquiry is with our event
          desk — expect a call or email from us within one working day with
          first menu thoughts.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={whatsappLink(data.eventType)}
            target="_blank"
            rel="noreferrer"
            className="btn bg-saffron text-espresso hover:bg-cream"
          >
            Continue on WhatsApp
          </a>
          <a href={site.phoneHref} className="btn-outline-light">
            Call {site.phone}
          </a>
        </div>
      </div>
    );
  }

  const fieldCls = (name: string) =>
    cn(
      "w-full border bg-transparent px-4 py-3.5 text-[14.5px] text-ink placeholder:text-ink/35 transition-colors duration-300 focus:outline-none",
      errors[name]
        ? "border-red-700 focus:border-red-700"
        : "border-ink/25 focus:border-saffron-deep"
    );

  const Err = ({ name }: { name: string }) =>
    errors[name] ? (
      <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-[12px] text-red-700">
        <svg viewBox="0 0 12 12" className="h-3 w-3 flex-none" fill="currentColor" aria-hidden="true">
          <circle cx="6" cy="6" r="6" opacity="0.15" />
          <path d="M6 3v3.4M6 8.4v.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        {errors[name]}
      </p>
    ) : null;

  /* ---------------- form ---------------- */
  return (
    <form onSubmit={onSubmit} noValidate className="grain relative bg-espresso p-8 text-cream sm:p-12">
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <Field label="Your Name" htmlFor="q-name" error={errors.name}>
          <input
            id="q-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="e.g. Ananya Sharma"
            value={data.name}
            onChange={(e) => set("name", e.target.value)}
            className={fieldCls("name")}
          />
        </Field>

        <Field label="Phone Number" htmlFor="q-phone" error={errors.phone}>
          <input
            id="q-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="e.g. +91 98XXX XXXXX"
            value={data.phone}
            onChange={(e) => set("phone", e.target.value)}
            className={fieldCls("phone")}
          />
        </Field>

        <Field label="Email" htmlFor="q-email" error={errors.email} className="sm:col-span-2">
          <input
            id="q-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={data.email}
            onChange={(e) => set("email", e.target.value)}
            className={fieldCls("email")}
          />
        </Field>

        <Field label="Event Type" htmlFor="q-eventType" error={errors.eventType}>
          <select
            id="q-eventType"
            name="eventType"
            value={data.eventType}
            onChange={(e) => set("eventType", e.target.value)}
            className={cn(fieldCls("eventType"), "cursor-pointer", !data.eventType && "text-ink/50")}
          >
            <option value="" disabled>
              Select occasion…
            </option>
            {eventTypeOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Event Date" htmlFor="q-eventDate" error={errors.eventDate}>
          <input
            id="q-eventDate"
            name="eventDate"
            type="date"
            value={data.eventDate}
            onChange={(e) => set("eventDate", e.target.value)}
            className={cn(fieldCls("eventDate"), "cursor-pointer [color-scheme:light]")}
          />
        </Field>

        <Field label="Event Location" htmlFor="q-location" error={errors.location}>
          <input
            id="q-location"
            name="location"
            type="text"
            placeholder="Venue / area / city"
            value={data.location}
            onChange={(e) => set("location", e.target.value)}
            className={fieldCls("location")}
          />
        </Field>

        <Field label="Number of Guests" htmlFor="q-guests" error={errors.guests}>
          <input
            id="q-guests"
            name="guests"
            type="number"
            min={1}
            placeholder="e.g. 250"
            value={data.guests}
            onChange={(e) => set("guests", e.target.value)}
            className={fieldCls("guests")}
          />
        </Field>

        <Field label="Food Preference" htmlFor="q-food" error={errors.foodPreference} className="sm:col-span-2">
          <select
            id="q-food"
            name="foodPreference"
            value={data.foodPreference}
            onChange={(e) => set("foodPreference", e.target.value)}
            className={cn(fieldCls("foodPreference"), "cursor-pointer", !data.foodPreference && "text-ink/50")}
          >
            <option value="" disabled>
              Select preference…
            </option>
            {foodPreferenceOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>

        {/* services checkbox group */}
        <fieldset className="sm:col-span-2">
          <legend className="eyebrow mb-1 text-cream/60">Required Services</legend>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {serviceOptions.map((s) => {
              const checked = data.services.includes(s);
              return (
                <label
                  key={s}
                  className={cn(
                    "cursor-pointer select-none border px-4 py-2.5 text-[12.5px] transition-colors duration-300",
                    checked
                      ? "border-saffron bg-saffron/15 text-cream"
                      : "border-cream/25 text-cream/65 hover:border-cream/60 hover:text-cream"
                  )}
                >
                  <input
                    type="checkbox"
                    name="services"
                    value={s}
                    checked={checked}
                    onChange={() => toggleService(s)}
                    className="sr-only"
                  />
                  {s}
                </label>
              );
            })}
          </div>
          <Err name="services" />
        </fieldset>

        <Field label="Additional Requirements" htmlFor="q-details" error={errors.details} className="sm:col-span-2">
          <textarea
            id="q-details"
            name="details"
            rows={4}
            placeholder="Live counters, cake coordination, timings, anything else on your mind…"
            value={data.details}
            onChange={(e) => set("details", e.target.value)}
            className={cn(fieldCls("details"), "resize-y")}
          />
        </Field>
      </div>

      {status === "error" && serverError && (
        <div role="alert" className="mt-7 flex items-start gap-3 border border-red-400/40 bg-red-400/10 px-5 py-4 text-[13.5px] text-red-200">
          <svg viewBox="0 0 12 12" className="mt-1 h-3.5 w-3.5 flex-none" fill="currentColor" aria-hidden="true">
            <circle cx="6" cy="6" r="6" opacity="0.3" />
            <path d="M6 3v3.4M6 8.4v.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span>
            {serverError}{" "}
            <button type="button" onClick={() => setStatus("idle")} className="cursor-pointer underline underline-offset-2">
              Try again
            </button>
          </span>
        </div>
      )}

      <div className="mt-9 flex flex-col gap-5 border-t border-cream/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-[12px] leading-relaxed text-cream/45">
          We reply within one working day. Your details stay with us — never
          shared, never spammed.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn w-full cursor-pointer bg-saffron text-espresso hover:bg-cream disabled:cursor-wait disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? (
            <>
              <Spinner /> Sending…
            </>
          ) : (
            "Request a Quote"
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="eyebrow mb-2.5 block text-cream/60">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-[12px] text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
