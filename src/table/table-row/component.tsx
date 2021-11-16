import { FC, HTMLProps } from "react";

import { cn } from "@uuixjs/uuixweb-lib";

export const TableRow: FC<HTMLProps<HTMLTableRowElement>> = (props) => {
  return <tr {...props} className={cn("tw-table-row", props.className)} />;
};

TableRow.displayName = "TableRow";
