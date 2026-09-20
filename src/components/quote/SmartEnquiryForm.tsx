"use client";

import { useSearchParams } from "next/navigation";
import { useId, useState, useEffect } from "react";
import {
  eventTypeOptions,
  foodPreferenceOptions,
  QuoteFormData,
  serviceOptions,
  validateQuote,
} from "@/lib/validation";
import { site, whatsappMessage } from "@/content/site";
import { cn } from "@/lib/utils";

const INITIAL_DATA: QuoteFormData = {
  name: "",
  phone: "",
  email: "",
  eventType: "Wedding",
  eventDate: "",
  location: "Bengaluru",
  guests: "150",
  foodPreference: "Vegetarian + non-vegetarian",
  services: ["Food & beverage service", "Live counters", "Service staff"],
  details: "",
};

export function SmartEnquiryForm() {
  const searchParams = useSearchParams();
  const formId = useId();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [data, setData] = useState<QuoteFormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [refCode, setRefCode] = useState("");

  // Pre-fill form from URL parameters if redirected from EventBuilder
  useEffect(() => {
    if (!searchParams) return;
    const urlEventType = searchParams.get("eventType");
    const urlGuests = searchParams.get("guests");
    const urlFoodPref = searchParams.get("foodPreference");
    const urlServices = searchParams.get("services");
    const urlDetails = searchParams.get("details");

    setData((prev) => ({
      ...prev,
      eventType: urlEventType || prev.eventType,
      guests: urlGuests || prev.guests,
      foodPreference: urlFoodPref || prev.foodPreference,
      services: urlServices ? urlServices.split(",") : prev.services,
      details: urlDetails || prev.details,
    }));
  }, [searchParams]);

  const update = <K extends keyof QuoteFormData>(field: K, val: QuoteFormData[K]) => {
    setData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const toggleService = (svc: string) => {
    setData((prev) => {
      const exists = prev.services.includes(svc);
      const nextServices = exists
        ? prev.services.filter((s) => s !== svc)
        : [...prev.services, svc];
      return { ...prev, services: nextServices };
    });
    if (errors.services) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.services;
        return next;
      });
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const allErrors = validateQuote(data);
    const stepErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (allErrors.eventType) stepErrors.eventType = allErrors.eventType;
      if (allErrors.eventDate) stepErrors.eventDate = allErrors.eventDate;
      if (allErrors.location) stepErrors.location = allErrors.location;
    } else if (currentStep === 2) {
      if (allErrors.guests) stepErrors.guests = allErrors.guests;
      if (allErrors.foodPreference) stepErrors.foodPreference = allErrors.foodPreference;
      if (allErrors.services) stepErrors.services = allErrors.services;
    } else if (currentStep === 3) {
      if (allErrors.name) stepErrors.name = allErrors.name;
      if (allErrors.phone) stepErrors.phone = allErrors.phone;
      if (allErrors.email) stepErrors.email = allErrors.email;
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 4) as 1 | 2 | 3 | 4);
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1) as 1 | 2 | 3 | 4);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allErrors = validateQuote(data);
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      // jump to first step with error
      if (allErrors.eventType || allErrors.eventDate || allErrors.location) setStep(1);
      else if (allErrors.guests || allErrors.foodPreference || allErrors.services) setStep(2);
      else if (allErrors.name || allErrors.phone || allErrors.email) setStep(3);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Form submission failed");
      }

      const generatedRef = "NC-" + Math.floor(100000 + Math.random() * 900000);
      setRefCode(generatedRef);
      setSubmitSuccess(true);
    } catch {
      setErrors({ form: "Something went wrong submitting your enquiry. Please call or WhatsApp us directly." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    const waText = `${whatsappMessage(data.eventType)} (Ref: ${refCode}) - ${data.guests} guests, ${data.eventDate}.`;
    const waUrl = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(waText)}`;

    return (
      <div className="border border-saffron bg-cream p-8 md:p-12 text-center shadow-md">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-saffron/10 border border-saffron text-2xl text-saffron-deep">
          ✓
        </div>
        <span className="eyebrow text-saffron mt-4 block">Enquiry Received</span>
        <h3 className="display mt-1 text-[30px] font-semibold text-ink">
          Thank you, {data.name}!
        </h3>
        <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft max-w-md mx-auto">
          Your event quote request has been registered under reference code{" "}
          <strong className="text-ink font-mono">{refCode}</strong>. Our culinary team will review your specifications and contact you within 4 hours.
        </p>

        <div className="mt-6 border-t border-b border-ink/10 py-4 max-w-md mx-auto text-left text-[13px] space-y-1.5 bg-parchment/60 p-4">
          <div className="flex justify-between">
            <span className="text-ink-soft">Event:</span>
            <span className="font-medium text-ink">{data.eventType} ({data.guests} guests)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-soft">Target Date:</span>
            <span className="font-medium text-ink">{data.eventDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-soft">Location:</span>
            <span className="font-medium text-ink">{data.location}</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid"
          >
            <span>Connect on WhatsApp Now</span>
          </a>
          <button
            type="button"
            onClick={() => {
              setSubmitSuccess(false);
              setStep(1);
              setData(INITIAL_DATA);
            }}
            className="btn btn-outline"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-ink/20 bg-cream p-6 md:p-10 shadow-sm">
      {/* Progress Header */}
      <div className="border-b border-ink/15 pb-6">
        <div className="flex items-center justify-between">
          <span className="eyebrow text-saffron">Smart Enquiry System</span>
          <span className="text-[12px] font-medium text-ink-soft">
            Step {step} of 4: {step === 1 ? "Event Specs" : step === 2 ? "Preferences" : step === 3 ? "Your Details" : "Review & Send"}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={cn(
                "h-1.5 transition-all duration-300",
                step >= s ? "bg-saffron" : "bg-ink/15"
              )}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* STEP 1: Event Specs */}
        {step === 1 && (
          <div className="space-y-5">
            <h3 className="display text-[22px] font-medium text-ink">Step 1 — Event Basics</h3>

            <div>
              <label htmlFor={`${formId}-eventType`} className="block text-[13px] font-medium text-ink">
                Event Type <span className="text-saffron">*</span>
              </label>
              <select
                id={`${formId}-eventType`}
                value={data.eventType}
                onChange={(e) => update("eventType", e.target.value)}
                className="mt-1.5 w-full border border-ink/20 bg-parchment/60 p-3 text-[14px] text-ink focus:border-saffron focus:bg-cream focus:outline-none"
              >
                {eventTypeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.eventType && <p className="mt-1 text-[12px] text-clay">{errors.eventType}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`${formId}-eventDate`} className="block text-[13px] font-medium text-ink">
                  Event Date <span className="text-saffron">*</span>
                </label>
                <input
                  type="date"
                  id={`${formId}-eventDate`}
                  value={data.eventDate}
                  onChange={(e) => update("eventDate", e.target.value)}
                  className="mt-1.5 w-full border border-ink/20 bg-parchment/60 p-3 text-[14px] text-ink focus:border-saffron focus:bg-cream focus:outline-none"
                />
                {errors.eventDate && <p className="mt-1 text-[12px] text-clay">{errors.eventDate}</p>}
              </div>

              <div>
                <label htmlFor={`${formId}-location`} className="block text-[13px] font-medium text-ink">
                  Event City / Venue Location <span className="text-saffron">*</span>
                </label>
                <input
                  type="text"
                  id={`${formId}-location`}
                  value={data.location}
                  onChange={(e) => update("location", e.target.value)}
                  placeholder="e.g. Indiranagar, Bengaluru"
                  className="mt-1.5 w-full border border-ink/20 bg-parchment/60 p-3 text-[14px] text-ink focus:border-saffron focus:bg-cream focus:outline-none"
                />
                {errors.location && <p className="mt-1 text-[12px] text-clay">{errors.location}</p>}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Scale & Catering Preferences */}
        {step === 2 && (
          <div className="space-y-5">
            <h3 className="display text-[22px] font-medium text-ink">Step 2 — Catering Requirements</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`${formId}-guests`} className="block text-[13px] font-medium text-ink">
                  Expected Guests <span className="text-saffron">*</span>
                </label>
                <input
                  type="number"
                  id={`${formId}-guests`}
                  value={data.guests}
                  onChange={(e) => update("guests", e.target.value)}
                  min={1}
                  max={50000}
                  className="mt-1.5 w-full border border-ink/20 bg-parchment/60 p-3 text-[14px] text-ink focus:border-saffron focus:bg-cream focus:outline-none"
                />
                {errors.guests && <p className="mt-1 text-[12px] text-clay">{errors.guests}</p>}
              </div>

              <div>
                <label htmlFor={`${formId}-foodPref`} className="block text-[13px] font-medium text-ink">
                  Food Preference <span className="text-saffron">*</span>
                </label>
                <select
                  id={`${formId}-foodPref`}
                  value={data.foodPreference}
                  onChange={(e) => update("foodPreference", e.target.value)}
                  className="mt-1.5 w-full border border-ink/20 bg-parchment/60 p-3 text-[14px] text-ink focus:border-saffron focus:bg-cream focus:outline-none"
                >
                  {foodPreferenceOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.foodPreference && <p className="mt-1 text-[12px] text-clay">{errors.foodPreference}</p>}
              </div>
            </div>

            <div>
              <span className="block text-[13px] font-medium text-ink mb-2">
                Services Required (Select all that apply) <span className="text-saffron">*</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {serviceOptions.map((svc) => {
                  const isChecked = data.services.includes(svc);
                  return (
                    <button
                      key={svc}
                      type="button"
                      onClick={() => toggleService(svc)}
                      className={cn(
                        "flex items-center gap-2.5 p-3 text-left border text-[13px] transition-all cursor-pointer",
                        isChecked
                          ? "border-saffron bg-cream text-ink font-medium"
                          : "border-ink/15 bg-parchment/60 text-ink-soft hover:border-ink/30"
                      )}
                    >
                      <span className={cn("h-4 w-4 border flex items-center justify-center text-[10px]", isChecked ? "border-saffron bg-saffron text-cream" : "border-ink/30")}>
                        {isChecked && "✓"}
                      </span>
                      <span>{svc}</span>
                    </button>
                  );
                })}
              </div>
              {errors.services && <p className="mt-1 text-[12px] text-clay">{errors.services}</p>}
            </div>
          </div>
        )}

        {/* STEP 3: Contact Details */}
        {step === 3 && (
          <div className="space-y-5">
            <h3 className="display text-[22px] font-medium text-ink">Step 3 — Your Contact Information</h3>

            <div>
              <label htmlFor={`${formId}-name`} className="block text-[13px] font-medium text-ink">
                Full Name <span className="text-saffron">*</span>
              </label>
              <input
                type="text"
                id={`${formId}-name`}
                value={data.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Your name"
                className="mt-1.5 w-full border border-ink/20 bg-parchment/60 p-3 text-[14px] text-ink focus:border-saffron focus:bg-cream focus:outline-none"
              />
              {errors.name && <p className="mt-1 text-[12px] text-clay">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`${formId}-phone`} className="block text-[13px] font-medium text-ink">
                  Phone / WhatsApp Number <span className="text-saffron">*</span>
                </label>
                <input
                  type="tel"
                  id={`${formId}-phone`}
                  value={data.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  className="mt-1.5 w-full border border-ink/20 bg-parchment/60 p-3 text-[14px] text-ink focus:border-saffron focus:bg-cream focus:outline-none"
                />
                {errors.phone && <p className="mt-1 text-[12px] text-clay">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor={`${formId}-email`} className="block text-[13px] font-medium text-ink">
                  Email Address <span className="text-saffron">*</span>
                </label>
                <input
                  type="email"
                  id={`${formId}-email`}
                  value={data.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="name@example.com"
                  className="mt-1.5 w-full border border-ink/20 bg-parchment/60 p-3 text-[14px] text-ink focus:border-saffron focus:bg-cream focus:outline-none"
                />
                {errors.email && <p className="mt-1 text-[12px] text-clay">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor={`${formId}-details`} className="block text-[13px] font-medium text-ink">
                Special Requests or Specific Dishes (Optional)
              </label>
              <textarea
                id={`${formId}-details`}
                rows={3}
                value={data.details}
                onChange={(e) => update("details", e.target.value)}
                placeholder="Mention any must-have dishes, Jain restrictions, or venue constraints..."
                className="mt-1.5 w-full border border-ink/20 bg-parchment/60 p-3 text-[14px] text-ink focus:border-saffron focus:bg-cream focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* STEP 4: Review & Final Submission */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="border border-saffron/40 bg-parchment/80 p-6">
              <span className="eyebrow text-saffron">Summary Review</span>
              <h3 className="display mt-1 text-[24px] font-semibold text-ink">
                YOUR EVENT REQUEST
              </h3>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13.5px] border-t border-ink/15 pt-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink-soft">Event Type:</span>
                    <button type="button" onClick={() => setStep(1)} className="text-[11px] text-saffron hover:underline cursor-pointer">Edit</button>
                  </div>
                  <p className="font-semibold text-ink mt-0.5">{data.eventType}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink-soft">Target Date &amp; Venue:</span>
                    <button type="button" onClick={() => setStep(1)} className="text-[11px] text-saffron hover:underline cursor-pointer">Edit</button>
                  </div>
                  <p className="font-semibold text-ink mt-0.5">{data.eventDate || "TBD"} in {data.location}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink-soft">Guest Count &amp; Diet:</span>
                    <button type="button" onClick={() => setStep(2)} className="text-[11px] text-saffron hover:underline cursor-pointer">Edit</button>
                  </div>
                  <p className="font-semibold text-ink mt-0.5">{data.guests} Guests ({data.foodPreference})</p>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink-soft">Contact Person:</span>
                    <button type="button" onClick={() => setStep(3)} className="text-[11px] text-saffron hover:underline cursor-pointer">Edit</button>
                  </div>
                  <p className="font-semibold text-ink mt-0.5">{data.name} ({data.phone})</p>
                </div>
              </div>

              {data.services.length > 0 && (
                <div className="mt-4 border-t border-ink/15 pt-3">
                  <span className="text-[12px] uppercase text-ink-soft font-medium">Selected Services:</span>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {data.services.map((s) => (
                      <span key={s} className="bg-cream px-2.5 py-1 text-[12px] border border-ink/10 text-ink">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {data.details && (
                <div className="mt-4 border-t border-ink/15 pt-3 text-[13px]">
                  <span className="text-ink-soft">Additional Notes:</span>
                  <p className="text-ink italic mt-0.5">&ldquo;{data.details}&rdquo;</p>
                </div>
              )}
            </div>

            {errors.form && (
              <p className="text-[13px] text-clay bg-clay/10 p-3 border border-clay/30">{errors.form}</p>
            )}
          </div>
        )}

        {/* Wizard Controls */}
        <div className="flex items-center justify-between border-t border-ink/15 pt-5">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="btn btn-outline"
            >
              &larr; Back
            </button>
          ) : (
            <span />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn btn-solid"
            >
              <span>Continue to Step {step + 1}</span>
              <svg className="btn-icon h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-solid"
            >
              <span>{isSubmitting ? "Submitting Request..." : "Send Enquiry Now"}</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
