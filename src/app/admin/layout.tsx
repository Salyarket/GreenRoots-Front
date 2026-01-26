"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/AuthStore";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    if (!user) {
      router.replace("/connexion");
      return;
    }
    if (user.role !== "admin") {
      router.replace("/");
    }
  }, [isMounted, user, router]);

  if (!isMounted || !user || user.role !== "admin") {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Chargement...</p>
      </main>
    );
  }

  return <>{children}</>;
}
