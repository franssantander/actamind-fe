"use client"
import { Suspense, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

function CallbackHandler() {
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    const code = params.get("code")
    if (!code) {
      router.push("/sign-in?error=missing_code")
      return
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/exchange`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("auth_token", data.token)
          router.push("/dashboard")
        } else {
          router.push("/sign-in?error=exchange_failed")
        }
      })
      .catch(() => router.push("/sign-in?error=exchange_failed"))
  }, [params, router])

  return <p className="text-center text-sm text-muted-foreground">Signing you in...</p>
}

export default function AuthCallback() {
  return (
    <Suspense fallback={<p className="text-center text-sm text-muted-foreground">Loading...</p>}>
      <CallbackHandler />
    </Suspense>
  )
}