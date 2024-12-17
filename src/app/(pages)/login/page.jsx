"use client";
import Image from "next/image";
import logoImg from "/public/dark-logo.svg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { getFormData, validate } from "@/lib/utils";
import { login } from "@/requests";
import { UpdateIcon } from "@radix-ui/react-icons";
import { useAppStore } from "@/lib/zustand";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { warnMessages } from "@/constants";

export default function page() {
  const inputUsername = useRef(null);
  const inputPassword = useRef(null);
  const { setAdmin, admin } = useAppStore();
  const router = useRouter();
  const [data, setData] = useState({
    admin: null,
    isLoading: false,
  });

  useEffect(() => {
    if (admin) {
      router.push("/");
    } else {
      document.title = "Kirish";
    }
  }, []);

  useEffect(() => {
    if (data.admin) {
      login(data.admin)
        .then((res) => {
          setAdmin(res);
          router.push("/");
        })
        .catch(({ message }) => {
          setData({ ...data, admin: null });
          inputUsername.current.focus();
          toast.error(message);
        })
        .finally(() => {
          setData({ ...data, isLoading: false });
        });
    }
  }, [data.admin]);

  function handleSubmit(e) {
    e.preventDefault();
    const result = getFormData(e.target);
    const checkedResult = validate(result, "login");
    if (checkedResult === false) {
      setData({ ...data, isLoading: true, admin: result });
    } else {
      if (checkedResult === warnMessages.empty.username) {
        inputUsername.current.focus();
      }
      if (checkedResult === warnMessages.empty.passsword) {
        inputPassword.current.focus();
      }
      toast.info(checkedResult);
    }
  }

  return (
    <div className="bg-body w-full h-full bg-no-repeat bg-cover">
      <div className="w-full flex items-center flex-col h-full justify-center px-5">
        <Image
          className="mb-5"
          src={logoImg}
          alt="chizlab.uz logo"
          priority
          width={165}
          height={38}
        />
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-96 flex flex-col gap-5"
        >
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="username">Login</Label>
            <Input
              className="bg-primary-foreground w-full"
              ref={inputUsername}
              type="text"
              id="username"
              name="username"
              autoComplete="off"
              placeholder="Loginni kiriting"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Maxfiy so'z</Label>
            <Input
              className="bg-primary-foreground w-full"
              ref={inputPassword}
              type="text"
              id="password"
              name="password"
              autoComplete="off"
              placeholder="Maxfiy so'zni kiriting"
            />
          </div>
          <Button type="submit" disabled={data.isLoading}>
            {data.isLoading ? (
              <UpdateIcon className="animate-spin" />
            ) : (
              "Kirish"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
