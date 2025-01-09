"use client";
import { CheckCircledIcon, UploadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useEffect, useRef, useState } from "react";
import { uploadFile } from "@/requests";
import { useAppStore } from "@/lib/zustand";
import { Loader2 } from "lucide-react";
import { allowImageSize, warnMessages } from "@/constants";
import { toast } from "sonner";

export default function UploadFile() {
  const { setGCoverImage, gCoverImage } = useAppStore();
  const inputRef = useRef(null);
  const [data, setData] = useState({
    url: null,
    isLoading: false,
  });
  useEffect(() => {
    console.log("Data state updated:", data);
  }, [data]);

  useEffect(() => {
    console.log("gCoverImage updated:", gCoverImage);
  }, [gCoverImage]);

  // useEffect(() => {
  //   if (data.url) {
  //     setGCoverImage(data.url);
  //     console.log(gCoverImage, "39 qator upload");
  //   }
  // }, [data.url]);

  function handleClick() {
    inputRef.current?.click();
  }

  function handleChange(e) {
    console.log(e.target.files[0]);

    const file = e.target.files[0];
    console.log(file, "35qator ");

    if (file.size > allowImageSize) {
      toast.warning(warnMessages.length.cover);
    } else {
      setGCoverImage(file);
      setData({
        url: file,
        isLoading: false,
      });
      console.log(data);
      console.log(gCoverImage, "img 43 qator");

      // setData((prev) => {
      //   return { ...prev, isLoading: false };
      // });

      // uploadFile(file)
      //   .then((url) => {
      //     setData((prev) => {
      //       return { ...prev, isLoading: false, url };
      //     });
      //   })
      //   .catch(() => {
      //     setData((prev) => {
      //       return { ...prev };
      //     });
      //   })
      //   .finally(() => {
      //     setData((prev) => {
      //       return { ...prev, isLoading: false };
      //     });
      //   });]

      setData((prev) => {
        return { url: file, isLoading: false };
      });
    }
    console.log(data);
    console.log(gCoverImage, "img 67 qator");
  }

  return (
    <div>
      <div className="grid w-full items-center gap-1.5 ">
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
