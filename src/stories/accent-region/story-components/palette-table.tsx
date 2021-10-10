import * as React from "react";

import { AccentColorList, contrast, luminance } from "lib";
import {
  AlignItems,
  BorderRadius,
  CoreText,
  Display,
  InjectLayout,
  Layout,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeading,
  TableRow,
} from "v2";

import { FC } from "react";
import { RGBColor } from "lib";
import { printColor } from "./utils";

export const PaletteTable: FC<{
  colors: AccentColorList;
  inputColor: RGBColor;
  inputColorHover: RGBColor;
}> = ({ colors, inputColor, inputColorHover }) => {
  const cssVariableLabels = [
    "Primary1",
    "Primary2",
    "Primary3",
    "Primary4",
    "Primary5",
  ];
  const cssVariableNames = [
    "color-accent-primary-1",
    "color-accent-primary-2",
    "color-accent-primary-3",
    "color-accent-primary-4",
    "color-accent-primary-5",
  ];
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeading label="Name" />
          <TableHeading label="Color" />
          <TableHeading label="Luminance" />
          <TableHeading label="Contrast to Input" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {colors.map((_, i) => (
          <TableRow key={i}>
            <TableCell>{cssVariableLabels[i]}</TableCell>
            <TableCell>
              <Layout display={Display.Flex} alignItems={AlignItems.Center}>
                <InjectLayout
                  borderRadius={BorderRadius.Large}
                  padding={1}
                  margin={{ right: 0.5 }}
                  display={Display.InlineBlock}
                  border
                >
                  <div
                    style={{ background: `var(--${cssVariableNames[i]})` }}
                  />
                </InjectLayout>

                <CoreText tabularNums>{printColor(colors[i])}</CoreText>
              </Layout>
            </TableCell>
            <TableCell>
              <CoreText tabularNums>{luminance(colors[i]).toFixed(2)}</CoreText>
            </TableCell>
            <TableCell>
              <CoreText tabularNums>
                {contrast(colors[i], inputColor).toFixed(2)}
              </CoreText>
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell>Input</TableCell>
          <TableCell>
            <Layout display={Display.Flex} alignItems={AlignItems.Center}>
              <InjectLayout
                borderRadius={BorderRadius.Large}
                padding={1}
                margin={{ right: 0.5 }}
                display={Display.InlineBlock}
                border
              >
                <div style={{ background: `var(--color-accent)` }} />
              </InjectLayout>

              <CoreText tabularNums>{printColor(inputColor)}</CoreText>
            </Layout>
          </TableCell>
          <TableCell>
            <CoreText tabularNums>{luminance(inputColor).toFixed(2)}</CoreText>
          </TableCell>
          <TableCell>
            <CoreText tabularNums>
              {contrast(inputColor, inputColor).toFixed(2)}
            </CoreText>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Input Hover</TableCell>
          <TableCell>
            <Layout display={Display.Flex} alignItems={AlignItems.Center}>
              <InjectLayout
                borderRadius={BorderRadius.Large}
                padding={1}
                margin={{ right: 0.5 }}
                display={Display.InlineBlock}
                border
              >
                <div style={{ background: `var(--color-accent-hover)` }} />
              </InjectLayout>

              <CoreText tabularNums>{printColor(inputColorHover)}</CoreText>
            </Layout>
          </TableCell>
          <TableCell>
            <CoreText tabularNums>
              {luminance(inputColorHover).toFixed(2)}
            </CoreText>
          </TableCell>
          <TableCell>
            <CoreText tabularNums>
              {contrast(inputColor, inputColorHover).toFixed(2)}
            </CoreText>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
