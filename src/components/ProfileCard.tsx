"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { contact } from "@/lib/dictionary";

const LinkedInIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const MailIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const PinIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default function ProfileCard() {
  const { t } = useLang();

  return (
    <motion.div
      className="profile-card"
      initial={{ opacity: 0, y: 60, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <img
        src="/logo.png"
        alt={t.meta.name}
        className="profile-photo"
      />
      <h1 className="profile-name">{t.meta.name}</h1>
      <p className="profile-tagline">{t.hero.blurb}</p>
      <div className="profile-socials">
        <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          {LinkedInIcon}
        </a>
        <a href={`mailto:${contact.email}`} aria-label="Email">
          {MailIcon}
        </a>
        <a
          href={`https://www.google.com/maps/search/${encodeURIComponent(t.contact.location)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.contact.locationLabel}
        >
          {PinIcon}
        </a>
      </div>
    </motion.div>
  );
}