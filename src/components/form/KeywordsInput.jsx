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

export default function KeywordsInput() {
  const { setGKeywords } = useAppStore();
  const inputRef = useRef(null);
  const [keywords, setKeywords] = useState([]);
  function handleAdd() {
    const value = inputRef.current.value;
    const length = value.trim().length;

    if (length === 0) {
      toast.warning(warnMessages.empty.inputKeywords);
      return;
    }

    if (length < 3) {
      toast.warning(warnMessages.length.inputKeywords);
      return;
    }

    setKeywords((prev) => {
      const is = prev.includes(value);
      if (is) {
        toast.warning(warnMessages.has.inputKeywords);
        return prev;
      } else {
        return [...prev, value];
      }
    });

    inputRef.current.value = "";
    inputRef.current.focus();
  }

  function handleDelete(id) {
    const result = keywords.filter((keyword) => keyword !== id);
    setKeywords(result);
  }

  useEffect(() => {
    setGKeywords(keywords);
  }, [keywords]);

  return (
    <div>
      <div className="grid w-full items-center gap-1.5 mb-3">
        <Label htmlFor="keywords">Kalit so'zlar*</Label>
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
            id="keywords"
            placeholder="Kalit so'zlarni kiriting"
          />
          <Button onClick={handleAdd} type="button">
            <PlusCircledIcon />
          </Button>
        </div>
      </div>

      {keywords.length === 0 ? (
        <Badge variant="secondary">! Hali kalit so'z qo'shilmadi</Badge>
      ) : (
        <ul className="flex flex-wrap gap-1">
          {keywords.map((keyword, index) => {
            return (
              <Badge key={index} variant="outline">
                <XIcon
                  onClick={() => handleDelete(keyword)}
                  className="w-3 h-3 mr-1 cursor-pointer hover:bg-primary hover:text-primary-foreground rounded-[2px]"
                />
                {keyword}
              </Badge>
            );
          })}
        </ul>
      )}
    </div>
  );
}
