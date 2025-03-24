import ConfirmTable from "@/app/(authed)/confirm/table";
import { searchParamsCache } from "@/lib/validations";
import { SearchParams } from "@/types";

interface ConfirmPageProps {
  searchParams: Promise<SearchParams>;
}

export async function NongsPage(props: ConfirmPageProps) {
  const searchParams = await props.searchParams;
  const search = searchParamsCache.parse(searchParams);

  return (
    <div className="flex w-full items-center justify-center pt-10">
      <div className="w-full max-w-[90vw]">
        <ConfirmTable
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
