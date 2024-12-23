"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useAppStore } from "@/lib/zustand";

export default function UniversalDrawer() {
  const { addItemDrawer, setAddItemDrawer, counter, setCounter } =
    useAppStore();

  return (
    <Sheet
      open={addItemDrawer.modal && counter !== 0}
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

          <RadioGroup
            defaultValue="1"
            value={counter}
            onValueChange={(value) => {
              const newCounter = value == "more" ? "more" : parseInt(value);
              setCounter(newCounter);
              console.log("Counter updated to:", newCounter);
            }}
            className="flex items-center flex-row flex-wrap"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="1"
                id="option-one"
                checked={counter == 1 ? true : false}
              />
              <Label htmlFor="option-one">1</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="2"
                id="option-two"
                checked={counter == 2 ? true : false}
              />
              <Label htmlFor="option-two">2</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="3"
                id="option-two"
                checked={counter == 3 ? true : false}
              />
              <Label htmlFor="option-two">3</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="4"
                id="option-two"
                checked={counter == 4 ? true : false}
              />
              <Label htmlFor="option-two">4</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="5"
                id="option-two"
                checked={counter == 5 ? true : false}
              />
              <Label htmlFor="option-two">5</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="more" id="option-two" />
              <Label htmlFor="option-two">K'oproq</Label>
            </div>
          </RadioGroup>
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
