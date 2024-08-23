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
    label: "Log"
  },
  {
    href: "/records",
    label: "Records",
  },
];

export const Nav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavHref, setIsNavHref] = useState(false)

  useEffect(() => {
    setIsNavHref(Boolean(naves.find(item => item.href === pathname)))
  }, [pathname])

  useEffect(() => {
    router.refresh()
  }, [pathname, router])

  return isNavHref && (
    <nav className="inline-flex p-1 border border-gray-200 rounded-md mb-4">
      {naves.map((nav) => (
        <Link className={cn("rounded px-2 py-1", nav.href === pathname && "bg-gray-100")} key={nav.href} href={nav.href} prefetch={false}>
          {nav.label}
        </Link>
      ))}
    </nav>
  );
};
