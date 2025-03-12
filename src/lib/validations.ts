import { createSearchParamsCache, parseAsInteger } from "nuqs/server";

import { getFiltersStateParser } from "@/lib/parsers";

export const searchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  filters: getFiltersStateParser().withDefault([]),
});
