import { FC, ReactNode } from "react";

import { getBreakpointCss } from "./utils";
import { styled } from "@uuixjs/uuixweb-lib";

export type Columns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type OffsetColumns = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export enum ColumnOrder {
  First = "first",
  Last = "last",
}

export interface ColumnValues {
  // The default key will always be required when sending a breakpoint object,
  // as it represents all viewport sizes above zero.
  default: Columns;
  xs?: Columns;
  sm?: Columns;
  md?: Columns;
  lg?: Columns;
  xl?: Columns;
  xxl?: Columns;
}

export interface OffsetValues {
  // The default key will always be required when sending a breakpoint object, as it represents all viewport sizes above zero.
  default: OffsetColumns;
  xs?: OffsetColumns;
  sm?: OffsetColumns;
  md?: OffsetColumns;
  lg?: OffsetColumns;
  xl?: OffsetColumns;
  xxl?: OffsetColumns;
}

export interface ColumnOrderValues {
  default?: ColumnOrder;
  xs?: ColumnOrder;
  sm?: ColumnOrder;
  md?: ColumnOrder;
  lg?: ColumnOrder;
  xl?: ColumnOrder;
  xxl?: ColumnOrder;
}

export interface ColumnProps {
  children?: ReactNode;
  /**
   * @example 4
   */
  cols: ColumnValues | Columns;
  offset?: OffsetValues | OffsetColumns;
  order?: ColumnOrderValues | ColumnOrder;
}

interface ScColumnProps {
  $cols: ColumnProps["cols"];
  $offset?: ColumnProps["offset"];
  $order?: ColumnProps["order"];
}

export const ScColumn = styled.div<ScColumnProps>`
  box-sizing: border-box;
  flex: 0 0 auto;

  ${({ $cols }) =>
    getBreakpointCss($cols, (value) => ({
      "flex-basis": (value / 12) * 100 + "%",
      "max-width": (value / 12) * 100 + "%",
    }))}

  ${({ $offset }) =>
    getBreakpointCss($offset, (value) => ({
      "margin-left": (value / 12) * 100 + "%",
    }))}

  ${({ $order }) =>
    getBreakpointCss($order, (value) => ({
      order: value === ColumnOrder.First ? -1 : 1,
    }))}
`;

export const Column: FC<ColumnProps> = ({ cols, offset, order, ...props }) => {
  return (
    <ScColumn
      className="tw-col"
      $cols={cols}
      $offset={offset}
      $order={order}
      {...props}
    />
  );
};
