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
import { getAllData } from "@/requests";
import { Trash, PenBoxIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function TableData() {
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  // delete function
  async function handleDelete(id) {
    if (confirm("Rostdan ham ochirmoqchimisiz?")) {
      try {
        await deleteData(id, router);
        fetchData();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  }

  useEffect(() => {
    getAllData("/materials?limit=10")
      .then((res) => {
        setData(res);
      })
      .catch(({ message }) => {
        toast.error(message);
      })
      .finally(() => {});
  }, []);

  return (
    <div className="base-container py-10 h-full">
      <div
        className="justify-end flex items-end my-2"
        onClick={() => {
          setIsEdit((prev) => {
            if (!prev) {
              toast.info("Edit mode on");
            } else {
              toast.info("Edit mode off");
            }
            return !prev;
          });
        }}
      >
        <PenBoxIcon></PenBoxIcon>
      </div>
      <Table>
        <TableCaption>chizlab.uz saytidagi ma'lumotlar</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Sarlavha</TableHead>
            <TableHead>Til</TableHead>
            <TableHead>Davlat</TableHead>
            <TableHead className="text-right">Sahifalar soni</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(({ id, title, language, country, volume }) => (
            <TableRow key={id}>
              <TableCell className="font-medium text-left">{id}</TableCell>
              <TableCell className="relative">
                {" "}
                {isEdit && (
                  <Trash
                    onClick={() => {
                      handleDelete(id);
                    }}
                    className="absolute -left-10 w-5 h-5"
                  ></Trash>
                )}{" "}
                {title}
              </TableCell>
              <TableCell>{language}</TableCell>
              <TableCell>{country}</TableCell>
              <TableCell className="text-right">{volume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Jami ma'lumotlar</TableCell>
            <TableCell className="text-right">{data.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
