import type { ReactNode } from "react";
import { Reveal, ParallaxY } from "./motion";

export default function SectionHeading({
  kicker,
  line1,
  line2,
  children,
}: {
  kicker: string;
  line1: string;
  line2: string;
  children?: ReactNode;
}) {
  return (
    <div>
      <Reveal>
        <span className="section-kicker">{kicker}</span>
      </Reveal>
      <ParallaxY distance={40}>
        <h2 className="section-title">
          {line1}
          <br />
          <span className="dim">{line2}</span>
        </h2>
      </ParallaxY>
      {children}
    </div>
  );
}
