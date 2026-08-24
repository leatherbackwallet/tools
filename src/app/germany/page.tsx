"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import SectionHeading from "@/components/SectionHeading";
import { Reveal } from "@/components/motion";
import { qaQuestions } from "@/lib/qa";
import { drivingQuestions } from "@/lib/driving";

export default function GermanyPage() {
  const { t } = useLang();

  return (
    <main>
      <div className="orb orb--accent" style={{ width: 400, height: 400, top: "2%", right: "-8%" }} />

      <section className="container page-head">
        <SectionHeading
          kicker={t.germany.kicker}
          line1={t.germany.title1}
          line2={t.germany.title2}
        />
      </section>

      <section className="container" style={{ paddingBottom: 60 }}>
        <Reveal>
          <p className="hero-sub" style={{ maxWidth: 720, fontSize: 18 }}>
            {t.germany.intro}
          </p>
        </Reveal>
      </section>

      <section className="container" style={{ paddingBottom: 100 }}>
        <div className="two-col">
          <Reveal>
            <div className="info-card">
              <h3>{t.germany.einTitle}</h3>
              <ul className="cert-list">
                {t.germany.einPoints.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="info-card">
              <h3>{t.germany.lidTitle}</h3>
              <ul className="cert-list">
                {t.germany.lidPoints.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <Link href="/germany/einburgertest/" className="qa-cta">
            <div>
              <span className="qa-cta-title">{t.germany.cta}</span>
              <span className="qa-cta-sub">
                {t.germany.ctaSub} · {qaQuestions.length} {t.germany.qa.questions}
              </span>
            </div>
            <span className="arrow">→</span>
          </Link>
        </Reveal>

        <Reveal delay={0.2}>
          <Link href="/germany/driving-license/" className="qa-cta qa-cta--dark" style={{ marginTop: 20 }}>
            <div>
              <span className="qa-cta-title">{t.germany.drivingCta}</span>
              <span className="qa-cta-sub">{t.germany.drivingSub}</span>
            </div>
            <span className="arrow">→</span>
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
