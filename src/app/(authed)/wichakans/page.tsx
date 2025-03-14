import { Button } from "@/components/ui/button";
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
        <Button variant="outline" className="w-fit">
          เพื่อน <span className="font-bold">{data?.staff}</span> ตรวจไปแล้ว{" "}
          <span className="font-bold">{data?.count}</span> ข้อ 🔥
        </Button>
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
