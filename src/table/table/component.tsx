import { staticTokenRule, styled, themeTokenRule } from "lib";

export interface TableProps {
  alternateRows?: boolean;
}
export const Table = styled.table.attrs(() => ({
  className: "tw-table",
}))<TableProps>`
  width: 100%;
  border-radius: ${staticTokenRule("border-radius-medium")};
  box-shadow: 0 0 0 1px ${themeTokenRule("color-border-base")};

  /* stylelint-disable selector-max-type */
  tr:nth-child(even) {
    background-color: ${({ alternateRows }) =>
      alternateRows && themeTokenRule("color-background-alt")};
  }
`;

Table.displayName = "Table";
