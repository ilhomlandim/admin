"use client";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import Image from "next/image";
import logoImage from "/public/dark-logo.svg";
import { useAppStore } from "@/lib/zustand";
import AddMaterialForm from "./form/AddMaterialForm";

export default function Header() {
  const { setCounter, counter, setAddItemDrawer } = useAppStore();
  function handleDrawer() {
    setAddItemDrawer({
      title: "Yangi material qo'shish",
      description:
        "Bu yerga qo'shgan ma'lumotlarinigiz chizlab.uz saytida ko'rinadi",
      width: 80,
      children: <AddMaterialForm />,
    });
  }

  return (
    <header className="py-5 shadow-sm">
      <div className="base-container flex items-center justify-between">
        <Image
          className="w-[170px]"
          src={logoImage}
          alt="chizlab.uz logo"
          priority
          width="170"
          height="40"
        />
        <Button
          onClick={() => {
            setCounter(1);
            handleDrawer();
          }}
        >
          <PlusCircledIcon className="mr-[2px]" />
          Qo'shish
        </Button>
      </div>
    </header>
  );
}
