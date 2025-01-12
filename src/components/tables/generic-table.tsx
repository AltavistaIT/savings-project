import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";

interface GenericTableProps {
  title: string
  data: any
}

export default function GenericTable({ title, data }: GenericTableProps) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">{title}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            data.map((item, index) => {
              return (
                <TableRow>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="font-medium">{item.value}</TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </>
  )
}