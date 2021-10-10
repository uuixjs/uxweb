import { FC, HTMLProps } from "react";

import { cn } from "lib/ui-utils";

export const TableHeader: FC<HTMLProps<HTMLTableSectionElement>> = (props) => {
  return (
    <thead {...props} className={cn("tw-table-header", props.className)} />
  );
};

TableHeader.displayName = "TableHeader";
