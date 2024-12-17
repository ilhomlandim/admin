"use client";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/zustand";
import { useEffect } from "react";

export default function page() {
  const { admin } = useAppStore();
  const router = useRouter();
  useEffect(() => {
    if (admin === null) {
      router.push("/login");
    }
  }, []);

  return <div>Tez kunda...</div>;
}
