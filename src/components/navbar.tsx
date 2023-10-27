"use client";

import {
  PiSlidersHorizontal,
  PiMagnifyingGlass,
  PiHeart,
  PiRoadHorizon,
  PiChatsTeardrop,
  PiUserCircle,
} from "react-icons/pi";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();
  return (
    <nav className="text-[.625rem] font-bold text-[#333333]">
      <div className="fixed top-0 flex w-full items-center justify-between px-4 pb-2 pt-5">
        <div className="flex h-11 grow items-center justify-start rounded-3xl bg-[#F0F3F4] pl-4 text-[1.0625rem] font-normal">
          <PiMagnifyingGlass size={25} />
          Search
        </div>
        <PiSlidersHorizontal
          size={28}
          className="flex w-[60px] items-center justify-center"
        />
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-around rounded-t-3xl bg-[#F0F3F4]/[.92] px-4 pb-9 pt-4 backdrop-blur-sm">
        <Link
          href={"/"}
          className="flex w-[60px] flex-col items-center justify-center gap-2"
        >
          <PiMagnifyingGlass size={28} />
          Explorer
        </Link>
        <Link
          href={"/"}
          className="flex w-[60px] flex-col items-center justify-center gap-2"
        >
          <PiHeart size={28} />
          Favoris
        </Link>
        {session.status === "authenticated" ? (
          <>
            <Link
              href={"/"}
              className="flex w-[60px] flex-col items-center justify-center gap-2"
            >
              <PiRoadHorizon size={28} />
              Reservations
            </Link>
            <Link
              href={"/"}
              className="flex w-[60px] flex-col items-center justify-center gap-2"
            >
              <PiChatsTeardrop size={28} />
              Messages
            </Link>
          </>
        ) : null}

        <Link
          href={session.status === "authenticated" ? "/" : "/api/auth/signin"}
          className="flex w-[60px] flex-col items-center justify-center gap-2"
        >
          <PiUserCircle size={28} />
          Profil
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
