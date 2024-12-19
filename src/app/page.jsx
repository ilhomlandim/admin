"use client";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/zustand";
import { useEffect } from "react";
import Header from "@/components/Header";

export default function page() {
  const { admin, setAddItemDrawer } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("admin")) || admin;
    if (result === null) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <Header />
    </>
  );
}
