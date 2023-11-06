import {
  PiMagnifyingGlass,
  PiHeart,
  PiRoadHorizon,
  PiChatsTeardrop,
  PiUserCircle,
} from "react-icons/pi";

export const links = [
  {
    route: "/",
    label: "Explorer",
    icon: PiMagnifyingGlass,
    showUnauthenticated: true,
  },
  {
    route: "/likes",
    label: "Favoris",
    icon: PiHeart,
    showUnauthenticated: true,
  },
  {
    route: "/reservations",
    label: "Reservations",
    icon: PiRoadHorizon,
    showUnauthenticated: false,
  },
  {
    route: "/conversations",
    label: "Messages",
    icon: PiChatsTeardrop,
    showUnauthenticated: false,
  },
  {
    route: "/profile",
    label: "Profil",
    icon: PiUserCircle,
    showUnauthenticated: true,
  },
];
