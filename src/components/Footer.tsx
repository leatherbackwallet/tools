"use client";

import { useLang, } from "@/lib/i18n";
import { contact } from "@/lib/dictionary";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>
          © {year} {t.meta.name}. {t.footer.rights}
        </span>
        <span>
          {t.footer.built} · <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </span>
      </div>
    </footer>
  );
}
