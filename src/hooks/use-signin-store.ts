import { create } from "zustand";

export type FormType = "default" | "register" | "login";
export type ProviderType = "all" | "google" | "facebook" | "discord";

interface FormStore {
  type: FormType;
  email: string;
  provider: ProviderType;
  setForm: (type: FormType) => void;
  setEmail: (email: string) => void;
  setProvider: (provider: ProviderType) => void;
  reset: () => void;
}

export const useFormSignIn = create<FormStore>((set) => ({
  type: "default",
  email: "",
  provider: "all",
  setForm: (type) => set({ type }),
  setEmail: (email) => set({ email }),
  setProvider: (provider) => set({ provider }),
  reset: () => set({ type: "default", email: "", provider: "all" }),
}));
