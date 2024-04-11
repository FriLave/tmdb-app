"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { UserModel } from "@/models/user";
import { DefaultError, useMutation, UseMutationResult } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { httpClient } from "@/lib/axios";
import { useTranslations } from "next-intl";

interface AuthContextType {
  user: Partial<UserModel> | null;
  signIn: UseMutationResult<
    Partial<UserModel>,
    DefaultError,
    UserAuth,
    unknown
  >;
  signUp: UseMutationResult<
    Partial<UserModel>,
    DefaultError,
    UserAuth,
    unknown
  >;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface UserAuth {
  username: string;
  password: string;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Partial<UserModel> | null>(null);
  const router = useRouter();
  const t = useTranslations("Authentication");

  const signUp = useMutation({
    mutationFn: async (user: { username: string; password: string }) => {
      const res = await httpClient.post<Partial<UserModel>>(
        "/api/register",
        user,
      );
      return res.data;
    },
    onSuccess: (data: Partial<UserModel>) => {
      setUser(data);

      toast({
        title: t("Register.Modal.Success.title"),
        description: t("Register.Modal.Success.description"),
      });

      router.push("/");
    },
    onError: () => {
      toast({
        title: t("Register.Modal.Error.title"),
        description: t("Register.Modal.Error.description"),
      });
    },
  });

  const signIn = useMutation({
    mutationFn: async (user: { username: string; password: string }) => {
      const res = await httpClient.post<Partial<UserModel>>("/api/login", user);
      return res.data;
    },
    onSuccess: (data: Partial<UserModel>) => {
      setUser(data);

      toast({
        title: t("Login.Modal.Success.title"),
        description: t("Login.Modal.Success.description"),
      });

      router.push("/");
    },
    onError: () => {
      toast({
        title: t("Login.Modal.Error.title"),
        description: t("Login.Modal.Error.description"),
      });
    },
  });

  const signOut = async () => {
    setUser(null);
    await httpClient.post("/api/logout");
    router.push("/signin");
  };

  if (!AuthContext)
    throw new Error("useAuth must be used within a AuthProvider");

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
