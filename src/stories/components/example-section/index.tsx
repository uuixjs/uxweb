import * as React from "react";

import { Color, Column, Grid, Layout, Title } from "v2";

import { ReactNode } from "react";

export const ExampleSection = ({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: ReactNode;
}) => (
  <Layout margin={{ bottom: 2 }} padding={2} border>
    <Grid>
      <Column cols={{ default: 12, sm: 3 }}>
        <Title>{label}</Title>
        {description && (
          <Layout margin={{ top: 1 }} color={Color.Alt2}>
            {description}
          </Layout>
        )}
      </Column>
      <Column cols={{ default: 12, sm: 9 }}>{children}</Column>
    </Grid>
  </Layout>
);
