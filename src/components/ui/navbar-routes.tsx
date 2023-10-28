"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

import { links } from "~/constants/navbar";

export const NavbarRoutes = () => {
  const session = useSession();
  const authenticated = session.status === "authenticated";

  return (
    <div className="fixed bottom-0 flex w-full items-center justify-around rounded-t-3xl bg-[#F0F3F4]/[.92] px-4 pb-9 pt-4 backdrop-blur-sm">
      {links.map((link) => {
        if (!link.showUnauthenticated && !authenticated) return null;
        const Icon = link.icon;
        return (
          <Link
            key={link.label}
            href={
              link.route === "/profile" && !authenticated
                ? "/api/auth/signin"
                : link.route
            }
            className="flex w-[60px] flex-col items-center justify-center gap-2"
          >
            <Icon size={28} />
            {link.label}
          </Link>
        );
      })}
    </div>
  );
};
