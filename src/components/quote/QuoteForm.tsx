"use client";

import { Suspense } from "react";
import { SmartEnquiryForm } from "@/components/quote/SmartEnquiryForm";

export function QuoteForm({
  prefillPackage,
  prefillEvent,
}: {
  prefillPackage?: string;
  prefillEvent?: string;
}) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-ink-soft">Loading Enquiry Form...</div>}>
      <SmartEnquiryForm />
    </Suspense>
  );
}
