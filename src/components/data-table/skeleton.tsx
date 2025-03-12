import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export function DataTableSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="w-full rounded-sm border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="first:pl-4 last:pr-4">
                <Skeleton className="h-6 w-full" />
              </TableHead>
              <TableHead className="first:pl-4 last:pr-4">
                <Skeleton className="h-6 w-full" />
              </TableHead>
              <TableHead className="first:pl-4 last:pr-4">
                <Skeleton className="h-6 w-full" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="first:pl-4 last:pr-4">
                  <Skeleton className="h-6 w-full" />
                </TableCell>
                <TableCell className="first:pl-4 last:pr-4">
                  <Skeleton className="h-6 w-full" />
                </TableCell>
                <TableCell className="first:pl-4 last:pr-4">
                  <Skeleton className="h-6 w-full" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );
}
