import * as React from "react";

import {
  AlignItems,
  BorderRadius,
  CoreText,
  Display,
  FlexDirection,
  FontSize,
  InjectLayout,
  JustifyContent,
  WhiteSpace,
} from "v2";
import { RGBColor, rgb2hex } from "@uuixjs/uuixweb-lib";

import { FC } from "react";
import { contrast } from "@uuixjs/uuixweb-lib";

export const ColorSwatch: FC<{ bg: RGBColor; fg: RGBColor }> = (props) => (
  <InjectLayout
    padding={1}
    borderRadius={BorderRadius.Medium}
    display={Display.Flex}
    flexDirection={FlexDirection.Column}
    justifyContent={JustifyContent.Center}
    alignItems={AlignItems.Center}
  >
    <div style={{ background: rgb2hex(props.bg), color: rgb2hex(props.fg) }}>
      <CoreText whiteSpace={WhiteSpace.NoWrap} fontSize={FontSize.Size8}>
        {props.children}
      </CoreText>
      <CoreText fontSize={FontSize.Size8} tabularNums>
        {contrast(props.bg, props.fg).toFixed(2)}
      </CoreText>
    </div>
  </InjectLayout>
);
