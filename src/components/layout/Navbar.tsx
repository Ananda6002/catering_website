"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/packages", label: "Packages" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-ink/10 bg-paper/95 py-3 backdrop-blur-sm"
            : "border-b border-transparent py-5"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" aria-label={`${site.name} — home`} className="shrink-0">
            <Logo />
          </Link>

          {/* desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "font-body text-[12px] font-medium uppercase tracking-[0.18em] transition-colors",
                  pathname === l.href ? "text-saffron-deep" : "text-ink/70 hover:text-ink"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/contact#quote"
              className="btn-solid !px-6 !py-3 text-[12px]"
            >
              Get a Quote
            </Link>
          </div>

          {/* mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-[60] flex h-11 w-11 items-center justify-center lg:hidden"
          >
            <span className="relative block h-3.5 w-6">
              <span
                className={cn(
                  "absolute left-0 top-0 h-px w-full bg-ink transition-all duration-300",
                  open && "top-1/2 rotate-45 bg-cream"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-ink transition-all duration-200",
                  open && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-px w-full bg-ink transition-all duration-300",
                  open && "bottom-auto top-1/2 -rotate-45 bg-cream"
                )}
              />
            </span>
          </button>
        </div>
      </header>

      {/* mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[55] bg-espresso transition-[opacity,visibility] duration-500 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
        aria-hidden={!open}
      >
        <div className="grain absolute inset-0" aria-hidden="true" />
        <div className="relative flex h-full flex-col justify-between px-7 pb-10 pt-28">
          <nav aria-label="Mobile">
            <ul className="space-y-1">
              {navLinks.map((l, i) => (
                <li
                  key={l.href}
                  className={cn(
                    "overflow-hidden border-b border-cream/10 transition-all duration-500",
                    open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  )}
                  style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
                >
                  <Link
                    href={l.href}
                    className={cn(
                      "display block py-3 text-4xl",
                      pathname === l.href ? "text-saffron" : "text-cream"
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className={cn(
              "space-y-4 transition-all delay-500 duration-500",
              open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            )}
          >
            <Link
              href="/contact#quote"
              className="btn bg-saffron text-espresso hover:bg-cream"
            >
              Get a Quote
            </Link>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] uppercase tracking-[0.2em] text-cream/60">
              <a href={site.phoneHref}>{site.phone}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
