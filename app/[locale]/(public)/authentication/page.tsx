"use client";

import { Icons } from "@/components/icons";
import { UserAuthForm } from "@/components/user-auth-form";
import { Fragment, useState } from "react";
import { useTranslations } from "next-intl";
import { UserDropdown } from "@/components/user-dropdown";

export default function LoginPage() {
  const [isRegistering, setRegistering] = useState<boolean>(false);
  const t = useTranslations(`Authentication.${isRegistering ? "Register" : "Login"}`);

  return (
    <Fragment>
      <div className={'absolute flex gap-2 right-4 top-4'}>
        <UserDropdown isConnected={false} />
      </div>
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto size-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              { t("title") }
            </h1>
            <p className="text-sm text-muted-foreground">
              { t('description') }
            </p>
          </div>
          <UserAuthForm isRegistering={isRegistering} />
          <button
            onClick={() => setRegistering(!isRegistering)}
            className="px-8 text-center text-sm text-muted-foreground"
          >
          <span className="cursor-pointer select-none underline underline-offset-4">
            { t('switchMode') }
          </span>
          </button>
        </div>
      </div>
    </Fragment>
  );
}
