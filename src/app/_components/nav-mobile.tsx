"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Container } from "~/components/ui/container";

import { links } from "~/constants/navbar";

export const NavLayoutMobile = () => {
  const session = useSession();
  const authenticated = session.status === "authenticated";

  return (
    <Container className="fixed bottom-0 w-full bg-white">
      <ul className="grid h-16 grid-cols-5">
        {links.map((link, index) => {
          if (!link.showUnauthenticated && !authenticated) return null;

          const Icon = link.icon;
          return (
            <li
              key={index}
              className={`
              ${index === 0 && !authenticated ? "col-start-2" : ""}
              font-light
              `}
            >
              <Link
                key={link.label}
                href={
                  link.route === "/profile" && !authenticated
                    ? "/signin"
                    : link.route
                }
                className="flex h-full flex-col items-center justify-center"
              >
                <Icon size={28} />
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </Container>
  );
};
