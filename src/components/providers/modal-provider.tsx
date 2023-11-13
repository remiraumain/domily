"use client";

import { SigninModal } from "../modals/signin-modal";
import { ProfileCompleteModal } from "../modals/profile-complete-modal";

import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>
      <SigninModal />
      <ProfileCompleteModal />
    </>
  );
};
