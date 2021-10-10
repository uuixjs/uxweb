import * as React from "react";

import {
  AlignItems,
  BorderRadius,
  Color,
  CoreText,
  Display,
  FlexDirection,
  FontSize,
  InjectLayout,
  JustifyContent,
  Layout,
  WhiteSpace,
} from "v2";
import { FC, useCallback, useState } from "react";
import { RGBColor, parse } from "lib";

import { printColor } from "./utils";

interface Props {
  color: string;
  label?: string;
}

export const TokenSwatch: FC<Props> = (props) => {
  const [colorLabel, setColorLabel] = useState("");

  const updateColorLabel = (node: HTMLDivElement) => {
    if (node !== null) {
      const style = getComputedStyle(node);

      const cssColor = style.getPropertyValue("background-color");
      setColorLabel(printColor(parse(cssColor) as RGBColor));
    }
  };

  const divRef = useCallback(updateColorLabel, []);

  return (
    <Layout display={Display.Flex} alignItems={AlignItems.Center}>
      <InjectLayout
        padding={1}
        borderRadius={BorderRadius.Medium}
        display={Display.Flex}
        flexDirection={FlexDirection.Column}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
        border
      >
        <div
          style={{
            background: props.color,
            transition: "1ms background-color linear",
          }}
          ref={divRef}
          onTransitionEnd={(event) => {
            updateColorLabel(event.currentTarget);
          }}
        >
          <CoreText whiteSpace={WhiteSpace.NoWrap} fontSize={FontSize.Size8}>
            {props.children}
          </CoreText>
        </div>
      </InjectLayout>

      <Layout margin={{ left: 0.5 }}>
        {props.label && <CoreText>{props.label}</CoreText>}
        <CoreText tabularNums color={Color.Alt2} fontSize={FontSize.Size7}>
          {colorLabel}
        </CoreText>
      </Layout>
    </Layout>
  );
};
