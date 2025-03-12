import {
  createSearchParamsCache,
  parseAsIndex,
  parseAsInteger,
} from "nuqs/server";

import { getFiltersStateParser } from "@/lib/parsers";

export const searchParamsCache = createSearchParamsCache({
  page: parseAsIndex.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  filters: getFiltersStateParser().withDefault([]),
});
