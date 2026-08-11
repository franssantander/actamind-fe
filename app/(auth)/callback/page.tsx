"use client"
import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {apiClient} from "@/lib/api/client";

export default function AuthCallback() {
    const router = useRouter()
    const params = useSearchParams()

    useEffect(() => {
        const code = params.get("code")
        if (!code) {
            router.push("/sign-in?error=missing_code")
            return
        }

        apiClient.post("/auth/exchange", { code })
            .then((data) => {
                if (data.data.token) {
                    localStorage.setItem("auth_token", data.data.token)
                    router.push("/dashboard")
                } else {
                    router.push("/sign-in?error=exchange_failed")
                }
            })
            .catch(() => router.push("/sign-in?error=exchange_failed"))
    }, [params, router])

    return <p className="text-center text-sm text-muted-foreground">Signing you in...</p>
}