"use client";

import { useEffect, useState } from "react";
import { NavLayoutMobile } from "./nav-mobile";
import { Search } from "./search";
import { usePathname } from "next/navigation";
import { Container } from "~/components/ui/container";
import { Logo } from "~/components/ui/logo";
import { UserMenu } from "./user-menu";

export const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const hasSearch = pathname === "/";

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="text-[.625rem] font-bold text-[#333333]">
      <Container className="py-2">
        <div className="flex flex-row items-center justify-between gap-6">
          <Logo className="hidden min-w-fit flex-none sm:block md:flex-1" />
          <Search />
          <UserMenu />
        </div>
      </Container>
      {isMobile ? <NavLayoutMobile /> : null}
    </nav>
  );
};
