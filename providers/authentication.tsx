"use client";

import React, {createContext, ReactNode, useContext, useState} from 'react';
import {useRouter} from 'next/navigation';
import {UserModel} from "@/models/user";
import {DefaultError, useMutation, UseMutationResult} from "@tanstack/react-query";
import {toast} from "@/components/ui/use-toast";
import {httpClient} from "@/lib/axios";

interface AuthContextType {
    user: Partial<UserModel> | null
    signIn: UseMutationResult<Partial<UserModel>, DefaultError, UserAuth, unknown>
    signUp: UseMutationResult<Partial<UserModel>, DefaultError, UserAuth, unknown>
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

    const signUp = useMutation({
            mutationFn: async (user:  { username: string, password: string}) => {
                const res = await httpClient.post<Partial<UserModel>>('/api/register', user);
                return res.data;
            },
            onSuccess: (data: Partial<UserModel>) => {
                setUser(data);

                toast({
                    title: "Inscription réussie",
                    description: "Vous êtes maintenant inscrit à votre compte",
                })

                router.push('/');
            },
            onError: (error) => {
                toast({
                    title: "Erreur d'inscription",
                    description: "Une erreur est survenue lors de l'inscription",
                })
            }
        }
    );

    const signIn = useMutation({
            mutationFn: async (user: { username: string, password: string }) => {
                const res = await httpClient.post<Partial<UserModel>>('/api/login', user);
                return res.data;
            },
            onSuccess: (data: Partial<UserModel>) => {
                setUser(data);

                toast({
                    title: "Connection réussie",
                    description: "Vous êtes maintenant connecté à votre compte",
                })

                router.push('/');
            },
            onError: (error) => {
                toast({
                    title: "Erreur de connexion",
                    description: "Le nom d'utilisateur ou le mot de passe est incorrect",
                })
            }
        }
    );

    const signOut = () => {
        setUser(null);
        router.push('/signin');
    };

    if (!AuthContext) throw new Error("useAuth must be used within a AuthProvider");

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
