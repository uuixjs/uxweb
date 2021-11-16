import { FC, HTMLProps } from "react";

import { cn } from "lib";

export const TableBody: FC<HTMLProps<HTMLTableSectionElement>> = (props) => {
  return <tbody {...props} className={cn("tw-table-body", props.className)} />;
};

TableBody.displayName = "TableBody";
