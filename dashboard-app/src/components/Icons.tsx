type IconProps = {
  className?: string;
};

export function NikeSwoosh({ className = "h-4 w-12" }: IconProps) {
  return (
    <svg viewBox="0 4.2 24 12.2" fill="currentColor" className={className} aria-hidden>
      <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.12 0-1.933-.392-2.437-1.177-.317-.504-.41-1.143-.28-1.918.13-.775.476-1.6 1.036-2.478.467-.71 1.232-1.643 2.297-2.8a6.122 6.122 0 00-.784 1.848c-.28 1.195-.028 2.072.756 2.632.373.261.886.392 1.54.392.522 0 1.11-.084 1.764-.252L24 7.8z" />
    </svg>
  );
}

export function SearchIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function BagIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M6.5 8.5h11l.8 11.2a1.5 1.5 0 0 1-1.5 1.6H7.2a1.5 1.5 0 0 1-1.5-1.6L6.5 8.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M9 8.5V7a3 3 0 0 1 6 0v1.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MenuIcon({ className = "h-5 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 28 18" fill="none" className={className} aria-hidden>
      <path d="M1 1.5h26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M1 9h26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M1 16.5h26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronDoubleLeft({ className = "h-4 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 28 16" fill="none" className={className} aria-hidden>
      <path d="M12 2L5 8l7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 2l-7 6 7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronDoubleRight({ className = "h-4 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 28 16" fill="none" className={className} aria-hidden>
      <path d="M6 2l7 6-7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 2l7 6-7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronDown({ className = "h-3 w-3" }: IconProps) {
  return (
    <svg viewBox="0 0 12 8" fill="none" className={className} aria-hidden>
      <path d="M1 1.5L6 6.5 11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

export function TwitterIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M21.5 6.4c-.6.3-1.3.5-2 .6.7-.4 1.3-1.1 1.6-1.9-.7.4-1.5.7-2.3.9A3.3 3.3 0 0 0 12.6 8c0 .3 0 .5.1.8-2.8-.1-5.2-1.5-6.8-3.5-.3.5-.4 1.1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1.1-.2-1.5-.4v.1c0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.2 3 2.3A6.6 6.6 0 0 1 3 16.6 9.3 9.3 0 0 0 8.1 18c6.1 0 9.5-5.1 9.5-9.5v-.4c.7-.5 1.3-1.1 1.9-1.7z" />
    </svg>
  );
}
