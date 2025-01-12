import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { generalView } from "@/core/static-data/general-view";

export const MainPage = () => {
  return (
    <div className="flex">
      <div>
        <div>

        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Vista General</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                generalView.map((item, index) => {
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
        </div>
      </div>
    </div>
  );
}