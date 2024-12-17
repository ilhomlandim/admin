"use client";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/zustand";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SidebarForm from "../components/SidebarForm";
import { useState } from "react";

export default function page() {
  const { admin } = useAppStore();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("admin")) || admin;
    if (result === null) {
      router.push("/login");
    }
  }, []);

  return (
  <div className="container mx-auto px-5 ">
      <nav className="flex justify-between items-center mt-3 flex-wrap gap-5">
        <Image
          src="/chizlab-logo.svg"
          alt="chizlab logo"
          width={120}
          className="sm:w-40 sm:h-20 md:w-44"
          height={100}
        />

        <div className="w-32 flex sm:w-52 md:w-80 items-center gap-2 border rounded-md px-2 py-1 md:py-2">
          <Image src="/Input.svg" alt="search icon" width={20} height={20} />
          <input
            type="search"
            placeholder="search"
            className="border-none w-8/12 shadow-none outline-none "
          />
        </div>
        <Button
          onClick={() => setSidebarOpen(true)}
          variant="outline"
          className="bg-blue-600 text-white py-5 flex items-center gap-2 hover:text-white hover:bg-blue-900"
        >
          {" "}
          <Image src="/Button.svg" alt="plus icon" width={20} height={20} /> Add
          Material
        </Button>
      </nav>
      <SidebarForm
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </div>
  );
}
