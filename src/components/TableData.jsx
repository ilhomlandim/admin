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
import { deleteData, getAllData, getDataById } from "@/requests";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { PenBoxIcon } from "lucide-react";
import AddMaterialForm from "./form/AddMaterialForm";

export default function TableData() {
  const [loading, setLoading] = useState(false);
  const { materials, setMaterials, admin } = useAppStore();
  const { gAuthors, gKeywords, setAddItemDrawer, setAdmin, gCoverImage } =
    useAppStore();
  function getDataId(data) {
    setLoading(true);
    handleDrawer(data);
    setMaterials(data, "more");
  }

  function handleDrawer(data) {
    setAddItemDrawer({
      title: "Yangi material qo'shish",
      description:
        "Bu yerga qo'shgan ma'lumotlarinigiz chizlab.uz saytida ko'rinadi",
      width: 80,
      children: <AddMaterialForm changeData={data} />,
    });
  }
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
            {materials.map((material) => (
              // {materials.map(({ id, title, volume }) => (

              <TableRow key={material.id}>
                <TableCell className="font-medium text-left">
                  {material.id}
                </TableCell>
                <TableCell className="relative">{material.title}</TableCell>
                <TableCell className="text-right">{material.volume}</TableCell>
                <TableCell className="flex justify-end gap-4 ">
                  <Button
                    onClick={() => {
                      if (confirm("O'zgartirmoqchisiz?")) {
                        toast.info("edit mode on");
                        getDataId(material);
                      }
                    }}
                    variant="secondary"
                    size="icon"
                  >
                    <PenBoxIcon />
                  </Button>
                  <Button
                    onClick={() => {
                      if (confirm("O'chirmoqchisiz?"))
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
