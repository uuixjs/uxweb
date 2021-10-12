import * as React from "react";

import { Background, Layout, Quote } from "v2";

export default { title: Quote.displayName };

export const examples = () => (
  <Layout>
    <Layout margin={{ bottom: 2 }}>
      <Quote>Hello</Quote>
    </Layout>
    <Layout margin={{ bottom: 2 }}>
      <Quote>
        <Layout padding={{ x: 1, y: 0.5 }} background={Background.Alt}>
          Here's an example with random stuff inside.
        </Layout>
      </Quote>
    </Layout>
    <Layout margin={{ bottom: 2 }}>
      <Quote padding={{ x: 3, y: 4 }}>
        <Layout padding={{ x: 1, y: 0.5 }} background={Background.Alt}>
          Here's an example with random stuff inside and custom padding.
        </Layout>
      </Quote>
    </Layout>
    <Layout margin={{ bottom: 2 }}>
      <Quote padding={{ x: 3, y: 4 }} color="#FF0000">
        <Layout padding={{ x: 1, y: 0.5 }} background={Background.Alt}>
          Here's an example with random stuff inside, custom padding, and a
          custom border color.
        </Layout>
      </Quote>
    </Layout>
  </Layout>
);
