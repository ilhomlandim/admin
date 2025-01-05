import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppStore } from "@/lib/zustand";
import { deleteData, getAllData } from "@/requests";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { TrashIcon } from "@radix-ui/react-icons";

export default function TableData() {
  const [loading, setLoading] = useState(false);
  const { materials, setMaterials, admin } = useAppStore();

  useEffect(() => {
    setLoading(true);
    getAllData("/materials")
      .then((res) => {
        setMaterials(res, "more");
      })
      .catch(({ message }) => {
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="base-container py-10 h-full">
      {loading ? (
        <p>Yuklanmoqda...</p>
      ) : (
        <Table>
          <TableCaption>chizlab.uz saytidagi ma'lumotlar</TableCaption>
          <TableHeader className="w-full">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Sarlavha</TableHead>
              <TableHead className="text-right">Sahifalar soni</TableHead>
              <TableHead className="text-right">Harakatlar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {materials.map(({ id, title, volume }) => (
              <TableRow key={id}>
                <TableCell className="font-medium text-left">{id}</TableCell>
                <TableCell className="relative">{title}</TableCell>
                <TableCell className="text-right">{volume}</TableCell>
                <TableCell className="flex justify-end">
                  <Button
                    onClick={() => {
                      if (confirm("O'chirmoqchisizi?"))
                        deleteData("/materials/", id, admin.access_token).then(
                          ({ message }) => {
                            toast.success(message);
                            window?.location.reload();
                          }
                        );
                    }}
                    variant="destructive"
                    size="icon"
                  >
                    <TrashIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Jami ma'lumotlar</TableCell>
              <TableCell className="text-right">{materials.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  );
}
