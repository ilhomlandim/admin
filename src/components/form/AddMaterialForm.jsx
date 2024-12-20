import { form } from "@/constants";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import KeywordsInput from "./KeywordsInput";
import AuthoursInput from "./AuthorsInput";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { BookmarkIcon } from "@radix-ui/react-icons";
import { getFormData, validate } from "@/lib/utils";
import { useAppStore } from "@/lib/zustand";

import { toast } from "sonner";

export default function AddMaterialForm() {
  const { gAuthors, gKeywords } = useAppStore();
  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      ...getFormData(e.target),
      authors: gAuthors,
      keywords: gKeywords,
    };
    const checkedResult = validate(data, "form");
    if (checkedResult === false) {
      console.log(data);
    } else {
      const { message, target } = checkedResult;
      toast.warning(message, { position: "top-left" });
      e.target[target].focus();
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col pl-1 pr-2 gap-y-6">
      <div className="grid grid-cols-3  gap-x-5 gap-y-6">
        {/* Title  */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title">Sarlavha*</Label>
          <Input
            type="text"
            id="title"
            name="title"
            placeholder="Sarlavhani kiriting"
          />
        </div>

        {/* Volume  */}
        <div className="grid w-full items-center gap-1.5 col-start-2 col-end-4">
          <Label htmlFor="volume">Sahifalar soni*</Label>
          <Input
            type="number"
            id="volume"
            name="volume"
            min="1"
            placeholder="Sahifalar sonini kiriting"
          />
        </div>

        {/* Cover  */}
        <div className="grid w-full items-center gap-1.5 col-start-1 col-end-3">
          <Label htmlFor="cover">Rasm uchun havola*</Label>
          <Input
            type="text"
            id="cover"
            name="cover"
            placeholder="Rasm uchun havolanini kiriting"
          />
        </div>

        {/* Published At */}
        <Label className="grid w-full items-start gap-1.5">
          <span>Chop etilgan yil*</span>
          <Select name="publishedAt">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chop etilgan yilni tanlang" />
            </SelectTrigger>
            <SelectContent>
              {form.publishedAt.map((year) => {
                return (
                  <SelectItem key={year} value={`${year}`}>
                    {year}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </Label>

        {/* Country  */}
        <Label className="grid w-full items-start gap-1.5">
          <span>Davlat*</span>
          <Select name="country">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Davlatni tanlang" />
            </SelectTrigger>
            <SelectContent>
              {form.countries.map((country) => {
                return (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </Label>

        {/* Language  */}
        <Label className="grid w-full items-start gap-1.5 col-start-2 col-end-4">
          <span>Til*</span>
          <Select name="language">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tilni tanlang" />
            </SelectTrigger>
            <SelectContent>
              {form.languages.map((lang) => {
                return (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </Label>

        {/* Resource type  */}
        <Label className="grid w-full items-start gap-1.5 col-start-1 col-end-3">
          <span>Resurs turi*</span>
          <Select name="resourceType">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Resurs turini tanlang" />
            </SelectTrigger>
            <SelectContent>
              {form.resourceTypes.map((resourceType) => {
                return (
                  <SelectItem key={resourceType} value={resourceType}>
                    {resourceType}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </Label>

        {/* Source  */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="source">Manbaa*</Label>
          <Input
            type="text"
            id="source"
            name="source"
            placeholder="Manbaa uchun havolanini kiriting"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Keywords  */}
        <KeywordsInput />

        {/* Authors  */}
        <AuthoursInput />

        {/* Summary  */}
        <div className="grid w-full gap-1.5">
          <Label htmlFor="summary">Tavsif*</Label>
          <Textarea
            className="min-h-24"
            placeholder="Material uchun tavsif yozing..."
            id="summary"
            name="summary"
          />
        </div>
      </div>

      {/* Actions  */}
      <div className="flex justify-end gap-3">
        <Button type="reset" variant="outline">
          Bekor qilish
        </Button>
        <Button type="submit">
          <BookmarkIcon className="mr-[2px]" />
          Saqlash
        </Button>
      </div>
    </form>
  );
}
