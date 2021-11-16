import { FC, HTMLProps } from "react";

import { cn } from "@uuixjs/uuixweb-lib";

export const TableBody: FC<HTMLProps<HTMLTableSectionElement>> = (props) => {
  return <tbody {...props} className={cn("tw-table-body", props.className)} />;
};

TableBody.displayName = "TableBody";
