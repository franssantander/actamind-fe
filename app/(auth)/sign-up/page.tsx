import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignUpForm } from "@/features/auth/components/sign-up-form";

export const metadata: Metadata = {
  title: "Get started free — Actamind",
};

export default function SignUpPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Get started free</CardTitle>
        <CardDescription>
          Create your free ActaMind account — no credit card required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  );
}
