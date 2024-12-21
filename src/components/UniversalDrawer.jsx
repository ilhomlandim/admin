"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAppStore } from "@/lib/zustand";

export default function UniversalDrawer() {
  const { addItemDrawer, setAddItemDrawer, counter, setCounter } =
    useAppStore();

  return (
    <Sheet
      open={addItemDrawer.modal && (counter == "more" || counter > 0)}
      onOpenChange={setAddItemDrawer}
    >
      <SheetContent
        style={{
          maxWidth: `${addItemDrawer.width}%`,
          width: "100%",
        }}
      >
        <SheetHeader className="py-1">
          <SheetTitle>{addItemDrawer.title}</SheetTitle>
          <SheetDescription>{addItemDrawer.description}</SheetDescription>
          <SheetDescription>
            {counter == "more"
              ? "Qo'shimcha ma'lumotlar qo'shilmoqda"
              : "Qoshilayotkan ma'lumotlar soni:" + counter}
          </SheetDescription>

          <Select
            onValueChange={(value) => {
              const newCounter =
                value === "more" ? value : parseInt(value, 10) || 1;
              setCounter(newCounter);
              console.log("Counter updated to:", newCounter);
            }}
          >
            <SelectTrigger className="w-64">
              <SelectValue
                value={counter.toString()}
                placeholder="Nechta ma'lumot qoshmoqchisiz?"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="more">Aniq emas</SelectItem>
            </SelectContent>
          </Select>
        </SheetHeader>
        <div
          style={{
            maxHeight: "calc(100% - 70px)",
          }}
          className="h-full overflow-y-auto py-5 scroll-smooth"
        >
          {addItemDrawer.children}
        </div>
      </SheetContent>
    </Sheet>
  );
}
