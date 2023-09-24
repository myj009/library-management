export type SortFields = {
  sortOrder: "asc" | "desc";
  sortBy: string;
};

export type FilterFields = {
  name: string;
  value: string | string[];
  operator:
    | "=="
    | "<"
    | ">"
    | "<="
    | ">="
    | "array-contains"
    | "array-contains-any"
    | "in"
    | "not-in"
    | "!=";
};
