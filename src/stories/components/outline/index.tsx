import * as React from "react";

import { Color, Layout, LayoutProps } from "v2";

import { FC } from "react";
import { styled } from 'lib';

const ScOutline = styled(Layout)`
  border: 2px dashed rgba(255, 0, 0, 0.4);
  pointer-events: initial;

  &:hover {
    background: rgba(255, 0, 0, 0.1);
  }
`;
export const Outline: FC<LayoutProps> = (props) => (
  <ScOutline
    color={Color.Alt2}
    children={props.children}
    padding={props.padding || 0.5}
  />
);
