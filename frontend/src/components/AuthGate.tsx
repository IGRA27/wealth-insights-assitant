"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function AuthGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  if (status === "loading") return null; // spinner
  if (!session) redirect("/api/auth/signin"); // fuerza login

  return <>{children}</>;
}
