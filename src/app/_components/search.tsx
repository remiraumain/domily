"use client";

import {
  PiCalendarBlank,
  PiMagnifyingGlass,
  PiNavigationArrow,
  PiSlidersHorizontal,
  PiUsers,
} from "react-icons/pi";

export const Search = () => {
  return (
    <div className="py-2.4 flex-1 cursor-pointer rounded-full border-[1px] transition sm:flex-auto">
      {/* <div className="flex flex-row items-center justify-between"> */}
      <div className="grid grid-cols-2 text-center sm:grid-cols-3">
        <div className="flex flex-1 items-center justify-center gap-3 px-6 text-sm font-semibold">
          <PiNavigationArrow size={16} />
          <span className="flex-1">Où</span>
        </div>
        <div className="flex flex-1 flex-row items-center justify-center gap-3 border-x-[1px] px-6 text-center text-sm font-semibold">
          <PiCalendarBlank size={16} />
          <span className="flex-1">Quand</span>
        </div>
        <div className="hidden flex-1 items-center justify-center gap-3 px-6 text-center text-sm font-semibold sm:flex">
          <PiUsers size={16} />
          <span className="flex-1">Qui</span>
        </div>
      </div>
    </div>
  );
};
