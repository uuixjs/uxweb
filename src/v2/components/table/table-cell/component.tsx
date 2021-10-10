import { FC, HTMLProps } from "react";
import { InjectLayout, TextAlign, VerticalAlign } from "../../layout";
import { Padding, cn } from "lib/ui-utils";

export interface TableCellProps {
  padding?: Padding;
  textAlign?: TextAlign;
  verticalAlign?: VerticalAlign;
}

export const TableCell: FC<
  TableCellProps & HTMLProps<HTMLTableCellElement>
> = ({ className, textAlign, padding, verticalAlign, ...tdProps }) => {
  const classes: ClassValue = {
    "tw-table-cell": true,
  };

  return (
    <InjectLayout
      padding={padding}
      textAlign={textAlign}
      verticalAlign={verticalAlign}
    >
      <td {...tdProps} className={cn(classes, className)} />
    </InjectLayout>
  );
};

TableCell.defaultProps = { padding: 1 };

TableCell.displayName = "TableCell";
