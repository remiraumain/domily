"use client";

import { PiMagnifyingGlass, PiSlidersHorizontal } from "react-icons/pi";

export const Search = () => {
  return (
    <div className="fixed top-0 flex w-full items-center justify-between px-4 pb-2 pt-5">
      <div className="border2red2500 flex h-11 grow items-center justify-start rounded-3xl border-2 bg-[#F0F3F4] pl-4 text-[1.0625rem] font-normal">
        <PiMagnifyingGlass size={25} />
        Search
      </div>
      <PiSlidersHorizontal
        size={28}
        className="flex w-[60px] items-center justify-center"
      />
    </div>
  );
};
