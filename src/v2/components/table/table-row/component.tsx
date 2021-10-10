import { FC, HTMLProps } from "react";

import { cn } from "lib";

export const TableRow: FC<HTMLProps<HTMLTableRowElement>> = (props) => {
  return <tr {...props} className={cn("tw-table-row", props.className)} />;
};

TableRow.displayName = "TableRow";
