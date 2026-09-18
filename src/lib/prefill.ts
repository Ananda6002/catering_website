/**
 * Map ?package= / ?event= query params to QuoteForm prefill values.
 * Used by the contact page (server) to prefill the client form.
 */
export type QuotePrefill = {
  prefillPackage?: string;
  prefillEvent?: string;
};

export function searchParamsToPrefill(
  sp: Record<string, string | string[] | undefined>
): QuotePrefill {
  const raw = (k: string) => {
    const v = sp[k];
    return Array.isArray(v) ? v[0] : v;
  };
  const pkg = raw("package");
  const event = raw("event");
  return {
    prefillPackage: pkg ? String(pkg) : undefined,
    prefillEvent: event ? String(event) : undefined,
  };
}
