"use client";

import { Icons } from "@/components/icons";
import { UserAuthForm } from "@/components/user-auth-form";
import { useState } from "react";

// export const metadata: Metadata = {
//     title: "Login",
//     description: "Login to your account",
// }

export default function LoginPage() {
  const [isRegistering, setRegistering] = useState<boolean>(false);

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto size-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            {isRegistering ? "Inscription" : "Re-bonjour"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {
              `Saisissez votre nom d'utilisateur pour vous ${isRegistering ? "inscrire sur TMDB Clone" : "connecter  à votre compte"}`
            }
          </p>
        </div>
        <UserAuthForm isRegistering={isRegistering} />
        <button
          onClick={() => setRegistering(!isRegistering)}
          className="px-8 text-center text-sm text-muted-foreground"
        >
          <span className="cursor-pointer select-none underline underline-offset-4">
            {!isRegistering
              ? "Vous n'avez pas de compte ? S'inscrire"
              : "Vous avez déjà un compte ? Se connecter"}
          </span>
        </button>
      </div>
    </div>
  );
}
