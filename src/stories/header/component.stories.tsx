import * as React from "react";

import { Header, InjectLayout } from "v2";

export default { title: Header.displayName };

export const examples = () => <Header>Header</Header>;

export const withEllipsis = () => (
  <InjectLayout border>
    <div style={{ maxWidth: 360 }}>
      <Header ellipsis>
        A super long header that should be shortened by an ellipsis
      </Header>
    </div>
  </InjectLayout>
);
