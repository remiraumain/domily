"use client";

import { usePathname } from "next/navigation";

import { NavbarRoutes } from "~/components/ui/navbar-routes";
import { Search } from "./search";

export const Navbar = () => {
  const pathname = usePathname();
  const hasSearch = pathname === "/";
  return (
    <nav className="text-[.625rem] font-bold text-[#333333]">
      {hasSearch && <Search />}
      <NavbarRoutes />
    </nav>
  );
};
