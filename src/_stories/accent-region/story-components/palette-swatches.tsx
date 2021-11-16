import * as React from "react";

import { AccentColorList, Margin, contrast } from "lib";
import {
  AlignItems,
  BorderRadius,
  CoreText,
  Display,
  FlexDirection,
  FontSize,
  InjectLayout,
  JustifyContent,
  Layout,
  Position,
  TextAlign,
} from "v2";
import { FC, Fragment, ReactNode } from "react";
import { RGBColor, parse } from "lib";

import { ColorSwatch } from "./color-swatch";
import { DynamicThemeMap } from "lib";

const cssVariableNames = [
  "color-accent-primary-1",
  "color-accent-primary-2",
  "color-accent-primary-3",
  "color-accent-primary-4",
  "color-accent-primary-5",
];

export const PaletteSwatches: FC<{
  colors: AccentColorList;
}> = ({ colors }) => {
  const HorizontalSwatchCompare: FC<{
    first: number;
    last: number;
    height?: string;
  }> = ({ first, last, height = "3rem" }) => (
    <>
      <Layout display={Display.Flex}>
        {colors.map((_, i) => (
          <Fragment key={i}>
            {(i < first || i > last) && (
              <Layout
                position={Position.Relative}
                padding={{ left: 3, right: 4 }}
              />
            )}
            {i === first && (
              <Layout
                position={Position.Relative}
                padding={{ left: 3, right: 4 }}
                flexGrow={1}
                textAlign={TextAlign.Center}
              >
                <CoreText tabularNums>
                  {contrast(colors[first], colors[last]).toFixed(2)}
                </CoreText>
              </Layout>
            )}
          </Fragment>
        ))}
      </Layout>
      <div style={{ display: "flex", height }}>
        {colors.map((_, i) => (
          <Layout
            key={i}
            flexGrow={1}
            position={Position.Relative}
            padding={{ left: 3, right: 4 }}
          >
            {/* invisible div creates space equal to border on swatches */}
            <div style={{ border: "1px solid transparent" }} />
            {i === first && (
              <InjectLayout position={Position.Absolute} attachTop attachRight>
                <div
                  style={{
                    height,
                    borderLeft: "2px solid black",
                    borderTop: "2px solid black",
                    borderTopLeftRadius: "var(--border-radius-medium)",
                    left: "3rem",
                  }}
                />
              </InjectLayout>
            )}
            {i > first && i < last && (
              <InjectLayout
                position={Position.Absolute}
                attachTop
                attachRight
                attachLeft
              >
                <div style={{ width: "100%", borderTop: "2px solid black" }} />
              </InjectLayout>
            )}
            {i === last && (
              <InjectLayout position={Position.Absolute} attachTop attachLeft>
                <div
                  style={{
                    height,
                    borderRight: "2px solid black",
                    borderTop: "2px solid black",
                    borderTopRightRadius: "var(--border-radius-medium)",
                    right: "4rem",
                  }}
                />
              </InjectLayout>
            )}
          </Layout>
        ))}
      </div>
    </>
  );

  const VerticalSwatchCompare: FC<{
    indexes: Array<number>;
    children: (c: RGBColor) => ReactNode;
  }> = ({ indexes, children }) => (
    <div style={{ display: "flex" }}>
      {colors.map((rgb, i, all) => (
        <Layout
          key={i}
          margin={getSwatchMargin(i, all.length)}
          flexGrow={1}
          flexShrink={1}
          fullWidth
          position={Position.Relative}
        >
          <Layout
            display={Display.Flex}
            flexDirection={FlexDirection.Column}
            alignItems={AlignItems.Center}
          >
            {indexes.includes(i) && children(rgb)}
          </Layout>
        </Layout>
      ))}
    </div>
  );

  return (
    <Layout position={Position.Relative}>
      <HorizontalSwatchCompare first={1} last={4} />
      <Layout display={Display.Flex}>
        {colors.map((_, i, all) => (
          <Layout
            key={i}
            margin={getSwatchMargin(i, all.length)}
            display={Display.Flex}
            flexDirection={FlexDirection.Column}
            position={Position.Relative}
          >
            {/* <InjectLayout
              position={Position.Absolute}
              attachLeft
              attachRight
              margin={{ x: 0.5 }}
            >
              <div
                style={{
                  top: (100 - rgb2hsl(rgb)[2]).toFixed(1) + "%",
                  borderTop: "2px solid white",
                }}
              />
            </InjectLayout> */}
            <InjectLayout
              position={Position.Absolute}
              attachLeft
              attachTop
              attachBottom
              attachRight
              padding={1}
              display={Display.Flex}
              justifyContent={JustifyContent.Center}
              alignItems={AlignItems.Center}
              fontSize={FontSize.Size4}
            >
              <div
                style={{
                  color:
                    i < 3 ? "var(--color-opac-w-5)" : "var(--color-opac-b-5)",
                }}
              >
                {i + 1}
              </div>
            </InjectLayout>
            <InjectLayout
              borderRadius={BorderRadius.Large}
              padding={3}
              display={Display.InlineBlock}
              border
            >
              <div style={{ background: `var(--${cssVariableNames[i]})` }} />
            </InjectLayout>
          </Layout>
        ))}
      </Layout>
      <Layout position={Position.Relative}>
        <VerticalSwatchCompare indexes={[0, 1, 2]}>
          {(rgb) => (
            <>
              <div
                style={{ borderLeft: "2px solid black", height: "1.5rem" }}
              />
              <ColorSwatch bg={rgb} fg={[255, 255, 255]} children="white" />
            </>
          )}
        </VerticalSwatchCompare>
        <VerticalSwatchCompare indexes={[0, 1]}>
          {(rgb) => (
            <>
              <div
                style={{ borderLeft: "2px solid black", height: "1.5rem" }}
              />

              <ColorSwatch
                bg={
                  parse(
                    DynamicThemeMap.light["color-background-alt-2"],
                  ) as RGBColor
                }
                fg={rgb}
                children="light alt2"
              />
            </>
          )}
        </VerticalSwatchCompare>

        <Layout position={Position.Absolute} attachTop attachRight fullWidth>
          <VerticalSwatchCompare indexes={[3, 4]}>
            {(rgb) => (
              <>
                <div
                  style={{ borderLeft: "2px solid black", height: "1.5rem" }}
                />
                <ColorSwatch
                  bg={
                    parse(
                      DynamicThemeMap.dark["color-background-alt-2"],
                    ) as RGBColor
                  }
                  fg={rgb}
                  children="dark alt2"
                />
              </>
            )}
          </VerticalSwatchCompare>
        </Layout>
      </Layout>
    </Layout>
  );
};

function getSwatchMargin(i: number, length: number): Margin {
  return {
    left: i > 0 ? 0.5 : 0,
    right: i < length - 1 ? 0.5 : 0,
  };
}
