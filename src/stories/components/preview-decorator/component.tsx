import * as React from "react";

import { Layout } from "v2";
import { MemoryRouter } from "react-router-dom";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export const PreviewDecorator = (props: Props) => (
  <MemoryRouter>
    <Layout
      padding={2}
      breakpointSmall={{ padding: 3 }}
      breakpointLarge={{ padding: 5 }}
    >
      {props.children}
    </Layout>
  </MemoryRouter>
);
