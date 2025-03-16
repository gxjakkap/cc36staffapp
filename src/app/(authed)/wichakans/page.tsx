import Link from "next/link";
import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatId } from "@/lib/formatter";
import { searchParamsCache } from "@/lib/validations";
import { SearchParams } from "@/types";

import { getHowManyChatGPT, getPersonalRecordCheck } from "./action";
import WichakansTable from "./table";

interface NongsPageProps {
  searchParams: Promise<SearchParams>;
}

export async function NongsPage(props: NongsPageProps) {
  const searchParams = await props.searchParams;
  const search = searchParamsCache.parse(searchParams);

  const [data] = await getPersonalRecordCheck();
  const [dataChat] = await getHowManyChatGPT();

  return (
    <div className="flex w-full items-center justify-center pt-10">
      <div className="flex w-full max-w-[90vw] flex-col gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-fit cursor-pointer">
              เพื่อน <span className="font-bold">{data?.staff}</span> ตรวจไปแล้ว{" "}
              <span className="font-bold">{data?.count}</span> ข้อ 🔥
            </Button>
          </PopoverTrigger>
          <PopoverContent className="max-h-[300px] w-80 overflow-y-auto">
            <div className="space-y-2">
              {data?.count && data.checkedNongs.length > 0 ? (
                <ScrollArea className="h-[240px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[70px]">รหัส</TableHead>
                        <TableHead className="text-center">คะแนน</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.checkedNongs.map((nong) => (
                        <TableRow key={nong.userId}>
                          <TableCell>{formatId(nong.userId)}</TableCell>
                          <TableCell className="text-center">
                            {nong.scoreAcademic}
                          </TableCell>
                          <TableCell className="w-8">
                            <Link href={`/wichakan/${nong.userId}`}>
                              <Button
                                variant="outline"
                                size="icon"
                                className="size-8"
                              >
                                <SearchIcon className="!size-3.5" />
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              ) : (
                <p className="text-muted-foreground text-sm">ยังไม่มีข้อมูล</p>
              )}
            </div>
          </PopoverContent>
        </Popover>
        <Button variant="outline" className="w-fit">
          น้องใช้ ChatGPT ไปแล้ว
          <span className="font-bold">{dataChat?.[0]?.count ?? 0}</span> คน 🔥
        </Button>
        <WichakansTable
          initialState={{
            pagination: {
              pageIndex: search.page - 1,
              pageSize: search.perPage,
            },
          }}
        />
      </div>
    </div>
  );
}
export default NongsPage;
