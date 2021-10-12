import * as React from "react";

import { Layout, ThemeToggle } from "v2";

export default { title: "ThemeToggle" };

export const examples = () => (
  <Layout margin={{ bottom: 2 }}>
    <ThemeToggle />
    <Layout margin={{ bottom: 2 }} />
    <ThemeToggle checked />
  </Layout>
);
