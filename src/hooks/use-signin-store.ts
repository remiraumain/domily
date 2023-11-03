import { create } from "zustand";

export type FormType = "default" | "register" | "login";

interface FormStore {
  type: FormType;
  email: string;
  setForm: (type: FormType) => void;
  setEmail: (email: string) => void;
  reset: () => void;
}

export const useFormSignIn = create<FormStore>((set) => ({
  type: "default",
  email: "",
  setForm: (type) => set({ type }),
  setEmail: (email) => set({ email }),
  reset: () => set({ type: "default", email: "" }),
}));
