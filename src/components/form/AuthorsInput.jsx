"use client";
import { useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { warnMessages } from "@/constants";
import { XIcon } from "lucide-react";
import { useAppStore } from "@/lib/zustand";

export default function AuthoursInput({ data }) {
  // console.log(data, "authors input");

  const { setGAuthors } = useAppStore();
  const inputRef = useRef(null);
  const [authors, setAuthors] = useState(data?.authors || []);

  function handleAdd() {
    const value = inputRef.current.value;
    const length = value.trim().length;

    if (length === 0) {
      toast.warning(warnMessages.empty.inputAuthors);
      return;
    }

    if (length < 6) {
      toast.warning(warnMessages.length.inputAuthors);
      return;
    }

    setAuthors((prev) => {
      const is = prev.includes(value);
      if (is) {
        toast.warning(warnMessages.has.inputAuthors);
        return prev;
      } else {
        return [...prev, value];
      }
    });

    inputRef.current.value = "";
    inputRef.current.focus();
  }

  function handleDelete(id) {
    const result = authors.filter((keyword) => keyword !== id);
    setAuthors(result);
  }

  useEffect(() => {
    // console.log(authors, "avtorlar use effekt");

    setGAuthors(authors);
  }, [authors]);

  return (
    <div>
      <div className="grid w-full items-center gap-1.5 mb-3">
        <Label htmlFor="authors">Mualliflar*</Label>
        <div className="flex gap-2">
          <Input
            onKeyPress={(e) => {
              if (e.charCode === 13) {
                e.preventDefault();
                handleAdd();
              }
            }}
            ref={inputRef}
            type="text"
            id="authors"
            placeholder="Mualliflarni kiriting"
          />
          <Button onClick={handleAdd} type="button">
            <PlusCircledIcon />
          </Button>
        </div>
      </div>

      {authors.length === 0 ? (
        <Badge variant="secondary">! Hali muallif qo'shilmadi</Badge>
      ) : (
        <ul className="flex flex-wrap gap-1">
          {authors.map((auth, index) => {
            return (
              <Badge key={index} variant="outline">
                <XIcon
                  onClick={() => handleDelete(auth)}
                  className="w-3 h-3 mr-1 cursor-pointer hover:bg-primary hover:text-primary-foreground rounded-[2px]"
                />
                {auth}
              </Badge>
            );
          })}
        </ul>
      )}
    </div>
  );
}
