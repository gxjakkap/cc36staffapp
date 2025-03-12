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
    <NongsTable
      initialState={{
        pagination: {
          pageIndex: search.page,
          pageSize: search.perPage,
        },
      }}
    />
  );
}
export default NongsPage;
