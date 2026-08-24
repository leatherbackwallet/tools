"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

export default function NavLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(pathname === href || pathname === href.replace(/\/$/, ""));
  }, [pathname, href]);

  return (
    <Link href={href} className={active ? "active" : ""}>
      {icon}
      <span>{label}</span>
    </Link>
  );
}
