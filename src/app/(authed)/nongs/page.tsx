import { searchParamsCache } from "@/lib/validations";
import { SearchParams } from "@/types";

import NongsTable from "./table";

interface NongsPageProps {
  searchParams: Promise<SearchParams>;
}

export async function NongsPage(props: NongsPageProps) {
  const searchParams = await props.searchParams;
  const search = searchParamsCache.parse(searchParams);

  return (
    <div className="flex w-full items-center justify-center pt-10">
      <div className="w-full max-w-[90vw]">
        <NongsTable
          initialState={{
            pagination: {
              pageIndex: search.page,
              pageSize: search.perPage,
            },
          }}
        />
      </div>
    </div>
  );
}
export default NongsPage;
