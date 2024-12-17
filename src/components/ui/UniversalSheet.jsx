"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAppStore } from "@/lib/zustand";

export default function UniversalSheet() {
  const { addItemDrawer, setAddItemDrawer } = useAppStore();
  return (
    <Sheet open={addItemDrawer.modal} onOpenChange={setAddItemDrawer}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{addItemDrawer.title}</SheetTitle>
          <SheetDescription>{addItemDrawer.description}</SheetDescription>
        </SheetHeader>
        {addItemDrawer.children}
      </SheetContent>
    </Sheet>
  );
}
