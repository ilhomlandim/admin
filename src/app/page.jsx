"use client";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/zustand";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { PlusCircledIcon } from "@radix-ui/react-icons";

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
    <div>
      <Button
        onClick={() => {
          setAddItemDrawer({
            modal: true,
            title: "Salom",
            description: "Alik",
            children: <Button />,
          });
        }}
      >
        <PlusCircledIcon className="mr-1" />
        Qo'shish
      </Button>
    </div>
  );
}
