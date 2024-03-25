"use client"

import * as React from "react"
import {FormEvent} from "react"

import {cn} from "@/lib/utils"
import {Icons} from "@/components/icons"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useAuth} from "@/providers/authentication";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    isRegistering?: boolean
}

export function UserAuthForm({ className, isRegistering, ...props }: UserAuthFormProps) {
    const { signIn, signUp }  = useAuth()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        try {
            const action = isRegistering ? signUp : signIn
            await action.mutateAsync({
                username: event.currentTarget.username.value,
                password: event.currentTarget.password.value
            })
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="username"
                            placeholder="Nom d'utilisateur"
                            type="text"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Password
                        </Label>
                        <Input
                            id="password"
                            placeholder="Mot de passe"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>
                    <Button disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                        )}
                        {isRegistering ? "S'inscrire" : "Se connecter"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
