const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function IconHome({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9a1 1 0 0 0 1 1h3.5v-6h3v6H17a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}

export function IconGrid({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
    </svg>
  );
}

export function IconSparkle({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2.5c.45 3.55 1.25 5.85 2.75 7.35 1.5 1.5 3.8 2.3 7.35 2.75-3.55.45-5.85 1.25-7.35 2.75-1.5 1.5-2.3 3.8-2.75 7.35-.45-3.55-1.25-5.85-2.75-7.35-1.5-1.5-3.8-2.3-7.35-2.75 3.55-.45 5.85-1.25 7.35-2.75 1.5-1.5 2.3-3.8 2.75-7.35Z" />
    </svg>
  );
}

export function IconMail({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function IconMenu({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} fill="none">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} fill="none">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function IconArrowUpRight({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function IconArrowRight({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2}>
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconDownload({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  );
}
