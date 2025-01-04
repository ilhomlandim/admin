"use client";
import { CheckCircledIcon, UploadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useEffect, useRef, useState } from "react";
import { uploadFile } from "@/requests";
import { useAppStore } from "@/lib/zustand";
import { Loader2 } from "lucide-react";

export default function UploadFile() {
  const { setGCoverImage, gCoverImage } = useAppStore();
  const inputRef = useRef(null);
  const [data, setData] = useState({
    url: null,
    isLoading: false,
  });

  useEffect(() => {
    console.log("Men ishladim");

    if (data.url) {
      setGCoverImage(data.url);
    }
  }, [data.url]);

  console.log(data.url, gCoverImage);

  function handleClick() {
    inputRef.current?.click();
  }

  function handleChange(e) {
    const file = e.target.files[0];
    setData((prev) => {
      return { ...prev, isLoading: true };
    });
    uploadFile(file)
      .then((url) => {
        setData((prev) => {
          console.log(url);

          return { ...prev, isLoading: false, url };
        });
      })
      .catch(() => {
        setData((prev) => {
          return { ...prev };
        });
      })
      .finally(() => {
        setData((prev) => {
          return { ...prev, isLoading: false };
        });
      });
  }

  return (
    <div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="cover">Rasm uchun havola*</Label>
        {gCoverImage === null && (
          <Button
            onClick={handleClick}
            className="relative"
            type="button"
            disabled={data.isLoading}
          >
            {data.isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                Yuklanmoqda...
              </>
            ) : (
              <>
                <UploadIcon />
                Rasm yuklash
              </>
            )}
          </Button>
        )}
        {gCoverImage && (
          <Button variant="secondary">
            <CheckCircledIcon />
            Rasm yuklangan
          </Button>
        )}
        <input
          onChange={handleChange}
          className="sr-only"
          ref={inputRef}
          type="file"
          accept=".jpeg, .jpg, .png"
        />
      </div>
    </div>
  );
}
