import * as React from "react";

import {
  AlignItems,
  Cursor,
  Display,
  JustifyContent,
  Layout,
} from "v2";

import styled from "styled-components";

export default { title: "Performance | Core UI + styled-components" };

const ScWithLayout = styled(Layout)`
  width: 25px;
  height: 25px;
  background: blue;
  color: white;
  box-sizing: border-box;
`;

export function StyledComponentWithLayout() {
  return (
    <>
      {[...Array(50)].map((_, i) => (
        <ScWithLayout
          display={Display.InlineFlex}
          justifyContent={JustifyContent.Center}
          alignItems={AlignItems.Center}
          cursor={Cursor.Pointer}
          margin={0.5}
          key={i}
        >
          {i + 1}
        </ScWithLayout>
      ))}
    </>
  );
}
