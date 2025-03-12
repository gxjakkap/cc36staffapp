import { searchParamsCache } from "@/lib/validations";
import { SearchParams } from "@/types";

import WichakansTable from "./table";

interface NongsPageProps {
  searchParams: Promise<SearchParams>;
}

export async function NongsPage(props: NongsPageProps) {
  const searchParams = await props.searchParams;
  const search = searchParamsCache.parse(searchParams);

  return (
    <WichakansTable
      initialState={{
        pagination: {
          pageIndex: search.page - 1,
          pageSize: search.perPage,
        },
      }}
    />
  );
}
export default NongsPage;
