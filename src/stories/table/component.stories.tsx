import * as React from "react";

import {
  ProgressBar,
  Sorting,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeading,
  TableRow,
} from "v2";

export default { title: Table.displayName };

export const example = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHeading sorting={Sorting.Default}>Country</TableHeading>
        <TableHeading>Views</TableHeading>
        <TableHeading>Percent</TableHeading>
        <TableHeading>Graph</TableHeading>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>United States</TableCell>
        <TableCell>200</TableCell>
        <TableCell>26%</TableCell>
        <TableCell>
          <ProgressBar value={26} mask />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Germany</TableCell>
        <TableCell>148</TableCell>
        <TableCell>14%</TableCell>
        <TableCell>
          <ProgressBar value={26} mask />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export const withCustomPadding = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHeading padding={{ x: 1, y: 0.5 }} sorting={Sorting.Default}>
          Country
        </TableHeading>
        <TableHeading padding={{ x: 1, y: 0.5 }}>Views</TableHeading>
        <TableHeading padding={{ x: 1, y: 0.5 }}>Percent</TableHeading>
        <TableHeading padding={{ x: 1, y: 0.5 }}>Graph</TableHeading>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell padding={{ x: 1, y: 0.5 }}>United States</TableCell>
        <TableCell padding={{ x: 1, y: 0.5 }}>200</TableCell>
        <TableCell padding={{ x: 1, y: 0.5 }}>26%</TableCell>
        <TableCell padding={{ x: 1, y: 0.5 }}>
          <ProgressBar value={26} mask />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell padding={{ x: 1, y: 0.5 }}>Germany</TableCell>
        <TableCell padding={{ x: 1, y: 0.5 }}>148</TableCell>
        <TableCell padding={{ x: 1, y: 0.5 }}>14%</TableCell>
        <TableCell padding={{ x: 1, y: 0.5 }}>
          <ProgressBar value={26} mask />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export const withAlternatingRows = () => (
  <Table alternateRows>
    <TableHeader>
      <TableRow>
        <TableHeading sorting={Sorting.Default}>Country</TableHeading>
        <TableHeading>Views</TableHeading>
        <TableHeading>Percent</TableHeading>
        <TableHeading>Graph</TableHeading>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>United States</TableCell>
        <TableCell>200</TableCell>
        <TableCell>26%</TableCell>
        <TableCell>
          <ProgressBar value={26} mask />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Germany</TableCell>
        <TableCell>148</TableCell>
        <TableCell>14%</TableCell>
        <TableCell>
          <ProgressBar value={14} mask />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Netherlands</TableCell>
        <TableCell>120</TableCell>
        <TableCell>10%</TableCell>
        <TableCell>
          <ProgressBar value={10} mask />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Brazil</TableCell>
        <TableCell>100</TableCell>
        <TableCell>8%</TableCell>
        <TableCell>
          <ProgressBar value={8} mask />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);
