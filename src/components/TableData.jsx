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
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function TableData() {
  const [data, setData] = useState([]);

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
              <TableCell className="relative">{title}</TableCell>
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
