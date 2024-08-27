"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const naves = [
  {
    href: "/",
    label: "Todo",
  },
  {
    href: "/log",
    label: "Log",
  },
  {
    href: "/records",
    label: "Records",
  },
];

export const Nav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavHref, setIsNavHref] = useState(false);

  useEffect(() => {
    setIsNavHref(Boolean(naves.find((item) => item.href === pathname)));
  }, [pathname]);

  return (
    isNavHref && (
      <nav className="inline-flex mb-4 h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
        {naves.map((nav) => (
          <Link
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ",
              nav.href === pathname && "bg-background text-foreground shadow"
            )}
            key={nav.href}
            href={nav.href}
            prefetch={false}
          >
            {nav.label}
          </Link>
        ))}
      </nav>
    )
  );
};
