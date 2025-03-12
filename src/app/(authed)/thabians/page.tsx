import { searchParamsCache } from "@/lib/validations";
import { SearchParams } from "@/types";

import ThabiansTable from "./table";

interface ThabiansPageProps {
  searchParams: Promise<SearchParams>;
}

export async function ThabiansPage(props: ThabiansPageProps) {
  const searchParams = await props.searchParams;
  const search = searchParamsCache.parse(searchParams);

  return (
    <ThabiansTable
      initialState={{
        pagination: {
          pageIndex: search.page,
          pageSize: search.perPage,
        },
      }}
    />
  );
}
export default ThabiansPage;
