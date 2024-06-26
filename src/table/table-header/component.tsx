import { FC, HTMLProps } from "react";

import { cn } from "@uuixjs/uuixweb-lib";

export const TableHeader: FC<HTMLProps<HTMLTableSectionElement>> = (props) => {
  return (
    <thead {...props} className={cn("tw-table-header", props.className)} />
  );
};

TableHeader.displayName = "TableHeader";
