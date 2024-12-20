"use client";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/zustand";
import { useEffect } from "react";
import TableData from "@/components/TableData";

export default function page() {
  const { admin } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("admin")) || admin;
    if (result === null) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <TableData />
    </>
  );
}
