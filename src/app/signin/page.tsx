"use client";

import { SignInForm } from "./_components/signin-form";
import { useFormSignIn } from "~/hooks/use-signin-store";
import { Providers } from "./_components/auth-providers";

export default function Signin() {
  const { reset, type, provider } = useFormSignIn();

  return (
    <main className="px-7">
      <header className="flex items-center justify-center py-11">
        <h1 className="text-[1.375rem] font-black">
          {type === "default" && "Connexion ou inscription"}
          {type === "login" && "Connexion"}
          {type === "register" && "Inscription"}
        </h1>
        {type !== "default" && <button onClick={reset}>Back</button>}
      </header>
      <h2 className="text-xl font-bold">Bienvenue sur Domily</h2>
      <SignInForm />
      {type === "default" || type === "login" ? (
        <Providers provider={provider} />
      ) : null}
    </main>
  );
}
