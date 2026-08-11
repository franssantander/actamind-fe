import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import {GoogleSignInButton} from "@/features/auth/components/google-sign-in-button";

export const metadata: Metadata = {
  title: "Sign in — Actamind",
};

export default function SignInPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Sign in to your ActaMind workspace.</CardDescription>
      </CardHeader>
      <CardContent>
         <GoogleSignInButton />

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">OR</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <SignInForm />
      </CardContent>
    </Card>
  );
}
