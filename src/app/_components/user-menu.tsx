import { useCallback, useState } from "react";
import { PiEquals } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { MenuItem } from "./menu-item";

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev: boolean) => !prev);
  }, []);

  return (
    <div className="relative hidden flex-1 md:block">
      <div className="flex flex-row items-center justify-end gap-3">
        <div
          onClick={() => {}}
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
        >
          Domily your home
        </div>
        <Popover>
          <PopoverTrigger className="flex cursor-pointer flex-row items-center gap-1 rounded-full border-[1px] border-neutral-200 p-4 transition hover:shadow-md md:px-1 md:py-1">
            <Avatar className="h-7.5 w-7.5">
              <AvatarImage src="/images/placeholder.jpg" alt="Menu" />
              <AvatarFallback>RR</AvatarFallback>
            </Avatar>
            <PiEquals size={24} />
          </PopoverTrigger>
          <PopoverContent>
            <MenuItem label="Testing" />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
