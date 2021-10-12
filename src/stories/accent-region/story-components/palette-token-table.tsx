import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeading,
  TableRow,
  accentTokenDarkThemeMap,
  accentTokenLightThemeMap,
} from "v2";

import { FC } from "react";
import { ThemeToken } from "lib";
import { TokenSwatch } from "./token-swatch";

export const PaletteTokenTable: FC = () => {
  const light = accentTokenLightThemeMap;
  const dark = accentTokenDarkThemeMap;

  const tokens = Object.keys(light) as ThemeToken[];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeading label="Token Name" />
          <TableHeading label="Light Theme" />
          <TableHeading label="Dark Theme" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {tokens.map((name) => (
          <TableRow key={name}>
            <TableCell>{name}</TableCell>
            <TableCell>
              <TokenSwatch
                color={`var(--${light[name]})`}
                label={light[name]}
              />
            </TableCell>
            <TableCell>
              <TokenSwatch color={`var(--${dark[name]})`} label={dark[name]} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
