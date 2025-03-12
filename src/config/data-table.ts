export type DataTableConfig = typeof dataTableConfig;

export const dataTableConfig = {
  columnTypes: [
    "text",
    "number",
    "date",
    "boolean",
    "select",
    "multi-select",
  ] as const,
};
