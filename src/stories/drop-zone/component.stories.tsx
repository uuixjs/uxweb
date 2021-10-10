import * as React from "react";

import { DropZone, Layout, Position } from "v2";

export default { title: DropZone.displayName };

export const examples = () => (
  <>
    <Layout position={Position.Relative} padding={2} margin={{ bottom: 2 }}>
      <DropZone />
    </Layout>
    <Layout position={Position.Relative} padding={2} margin={{ bottom: 2 }}>
      <DropZone dragOver />
    </Layout>
    <Layout position={Position.Relative} padding={2} margin={{ bottom: 2 }}>
      <DropZone error />
    </Layout>
    <Layout position={Position.Relative} padding={2} margin={{ bottom: 2 }}>
      <DropZone disabled />
    </Layout>
  </>
);
